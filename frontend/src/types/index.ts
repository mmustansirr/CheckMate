export interface PredictionRequest {
  headline: string;
}

export interface PredictionResponse {
  label: 'real' | 'fake';
  score: number;
  probs: {
    fake: number;
    real: number;
  };
}

export interface ApiError {
  detail: string;
}
