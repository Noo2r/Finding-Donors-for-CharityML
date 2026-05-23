from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import os

app = Flask(__name__)
CORS(app)

# --- Configuration & State ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SAVED_MODEL_DIR = os.path.join(BASE_DIR, "..", "saved_model")

model = None
scaler = None
feature_columns = None

SKEWED_COLS = ["capital-gain", "capital-loss"]
NUMERICAL_COLS = ["age", "education-num", "capital-gain", "capital-loss", "hours-per-week"]

def load_artifacts():
    global model, scaler, feature_columns
    try:
        model = joblib.load(os.path.join(SAVED_MODEL_DIR, "model.joblib"))
        scaler = joblib.load(os.path.join(SAVED_MODEL_DIR, "scaler.joblib"))
        feature_columns = joblib.load(os.path.join(SAVED_MODEL_DIR, "feature_columns.joblib"))
        print(f"[OK] Model loaded. Features: {len(feature_columns)}")
    except Exception as e:
        print(f"[ERROR] Could not load model artifacts: {e}")

# Load immediately on startup
load_artifacts()

def preprocess_input(raw: dict) -> pd.DataFrame:
    """Apply the same preprocessing as the training pipeline."""
    df = pd.DataFrame([raw])
    
    # Log-transform skewed
    for col in SKEWED_COLS:
        if col in df.columns:
            df[col] = np.log(df[col].astype(float) + 1)
            
    # Scale numerical
    if scaler:
        df[NUMERICAL_COLS] = scaler.transform(df[NUMERICAL_COLS])
        
    # One-hot encode
    df = pd.get_dummies(df)
    
    # Align columns
    aligned = pd.DataFrame(columns=feature_columns)
    for col in feature_columns:
        aligned[col] = df[col].values if col in df.columns else 0
        
    return aligned.astype(float)

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "ok",
        "model_loaded": model is not None
    })

@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500
        
    data = request.json
    if not data:
        return jsonify({"error": "No JSON data provided"}), 400
        
    try:
        # Expected types conversion
        raw = {
            "age": int(data.get("age", 35)),
            "workclass": data.get("workclass", "Private"),
            "education_level": data.get("education_level", "Bachelors"),
            "education-num": float(data.get("education-num", 13.0)),
            "marital-status": data.get("marital-status", "Married-civ-spouse"),
            "occupation": data.get("occupation", "Exec-managerial"),
            "relationship": data.get("relationship", "Husband"),
            "race": data.get("race", "White"),
            "sex": data.get("sex", "Male"),
            "capital-gain": float(data.get("capital-gain", 0)),
            "capital-loss": float(data.get("capital-loss", 0)),
            "hours-per-week": float(data.get("hours-per-week", 40)),
            "native-country": data.get("native-country", "United-States")
        }
        
        processed = preprocess_input(raw)
        
        # Inference
        prediction = int(model.predict(processed)[0])
        proba = model.predict_proba(processed)[0]
        
        # Confidence logic
        confidence = proba[1] if prediction == 1 else proba[0]
        
        # Generate mock feature importance for visual display (proportional to inputs)
        # In a real app you might use SHAP or tree feature_importances_
        fi = [
            {"name": "Capital Gain", "value": min(1.0, raw["capital-gain"] / 50000.0) if raw["capital-gain"] > 0 else 0.05},
            {"name": "Age", "value": min(1.0, raw["age"] / 90.0)},
            {"name": "Education Num", "value": min(1.0, raw["education-num"] / 16.0)},
            {"name": "Hours per Week", "value": min(1.0, raw["hours-per-week"] / 80.0)}
        ]
        
        return jsonify({
            "prediction": prediction,
            "confidence": float(confidence),
            "feature_importances": fi
        })
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
