# backend/app.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import joblib
import numpy as np
import os
from fastapi.middleware.cors import CORSMiddleware

# --- config ---
EMBEDDER_DIR = "models/embedder_classifier/embedder"
CLASSIFIER_PATH = "models/embedder_classifier/classifier.joblib"
LABEL_MAP = {1: "real", 0: "fake"}  # same mapping used in training

# --- startup load ---
app = FastAPI(title="CheckMate API")

# CORS configuration for production and development
# Get allowed origins from environment variable or use defaults
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins + ["https://*.vercel.app"],  # Allow Vercel deployments
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    embedder = SentenceTransformer(EMBEDDER_DIR)
    clf = joblib.load(CLASSIFIER_PATH)
except Exception as e:
    # Delay raise until first request if you prefer; here we raise so startup fails obviously if models missing
    raise RuntimeError(f"Failed to load models. Check paths. Error: {e}")

# --- request/response schema ---
class PredictRequest(BaseModel):
    headline: str

class PredictResponse(BaseModel):
    label: str
    score: float
    probs: dict

# --- helper ---
def predict_headline(text: str):
    emb = embedder.encode([text], convert_to_numpy=True)
    probs = clf.predict_proba(emb)[0].tolist()  # [prob_class0, prob_class1]
    pred = int(clf.predict(emb)[0])
    label = LABEL_MAP.get(pred, "unknown")
    # normalize into a readable dict
    probs_dict = {"fake": float(probs[0]), "real": float(probs[1])}
    score = probs_dict[label]
    return {"label": label, "score": float(score), "probs": probs_dict}

# --- endpoints ---
@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    text = req.headline.strip()
    if not text:
        raise HTTPException(status_code=400, detail="headline is empty")
    return predict_headline(text)

@app.get("/")
def root():
    return {"status": "ok", "note": "CheckMate API running"}
    