import pandas as pd
from sklearn.model_selection import train_test_split

# 1️⃣ Load CSV files
fake = pd.read_csv("data/raw/fake.csv")
real = pd.read_csv("data/raw/real.csv")

# 2️⃣ Add label column for training
fake["label"] = "fake"
real["label"] = "real"

# 3️⃣ Merge fake and real datasets
df = pd.concat([fake, real], ignore_index=True)

# 4️⃣ Use only the title column as input
df["text"] = df["title"].fillna("")  # fill missing titles with empty string

# 5️⃣ Drop duplicates and very short titles
df = df.drop_duplicates(subset=["text"])
df = df[df["text"].str.split().str.len() >= 3]  # keep titles with at least 3 words

# 6️⃣ Split into train, validation, test (80%-10%-10%)
train, temp = train_test_split(df, test_size=0.2, stratify=df.label, random_state=42)
val, test = train_test_split(temp, test_size=0.5, stratify=temp.label, random_state=42)

# 7️⃣ Save processed files in JSONL format for HuggingFace
train[["text", "label"]].to_json("data/processed/train.jsonl", orient="records", lines=True)
val[["text", "label"]].to_json("data/processed/val.jsonl", orient="records", lines=True)
test[["text", "label"]].to_json("data/processed/test.jsonl", orient="records", lines=True)

print("✅ Dataset prepared: train.jsonl, val.jsonl, test.jsonl")
