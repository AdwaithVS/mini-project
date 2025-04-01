from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb+srv://admin123:pass4mentaldb@mental-health-db.fn9ss.mongodb.net/?retryWrites=true&w=majority&appName=mental-health-db")
db = client["mental_health_db"]
users = db["users"]

nltk.download("vader_lexicon")
sia = SentimentIntensityAnalyzer()

score_mapping = {
    "Never": 0, "None of the time": 0, "Almost never": 1, "Rarely": 1,
    "Several days": 1, "Sometimes": 2, "Some of the time": 2,
    "More than half the days": 2, "Fairly often": 3, "Often": 3,
    "Nearly every day": 3, "Very often": 4, "All of the time": 4
}

def calculate_scores(answers):
    # GAD-7 (Questions 1-7)
    gad7_score = sum(score_mapping.get(answers.get(str(i), "Never"), 0) for i in range(1, 8))
    gad7_status = (
        "Minimal Anxiety" if gad7_score <= 4 else
        "Mild Anxiety" if gad7_score <= 9 else
        "Moderate Anxiety" if gad7_score <= 14 else
        "Severe Anxiety"
    )

    # PHQ-9 (Questions 6-14)
    phq9_score = sum(score_mapping.get(answers.get(str(i), "Never"), 0) for i in range(6, 15))
    phq9_status = (
        "Minimal Depression" if phq9_score <= 4 else
        "Mild Depression" if phq9_score <= 9 else
        "Moderate Depression" if phq9_score <= 14 else
        "Moderately Severe Depression" if phq9_score <= 19 else
        "Severe Depression"
    )

    # PSS (Questions 12-18, reverse scoring for 14, 15, 16)
    pss_scores = [score_mapping.get(answers.get(str(i), "Never"), 0) for i in range(12, 19)]
    for i in [2, 3, 4]:  # Indices for questions 14, 15, 16 (reverse scored)
        pss_scores[i] = 4 - pss_scores[i]  # Reverse: 0→4, 1→3, 2→2, 3→1, 4→0
    pss_score = sum(pss_scores)
    pss_status = (
        "Low Stress" if pss_score <= 9 else
        "Moderate Stress" if pss_score <= 18 else
        "High Stress"
    )

    # WEMWBS (Questions 19-25)
    wemwbs_score = sum(score_mapping.get(answers.get(str(i), "None of the time"), 0) for i in range(19, 26))
    wemwbs_status = (
        "Low Well-being" if wemwbs_score <= 14 else
        "Average Well-being" if wemwbs_score <= 20 else
        "High Well-being"
    )

    # Overall status (simplified logic for navigation)
    overall_status = (
        "Mentally Fit ✅" if gad7_score <= 9 and phq9_score <= 9 and pss_score <= 18 and wemwbs_score >= 15 else
        "Mild Concerns ⚠️" if gad7_score <= 14 and phq9_score <= 14 and pss_score <= 18 else
        "Moderate to Severe Concerns 🚨"
    )

    return {
        "gad7": {"score": gad7_score, "status": gad7_status},
        "phq9": {"score": phq9_score, "status": phq9_status},
        "pss": {"score": pss_score, "status": pss_status},
        "wemwbs": {"score": wemwbs_score, "status": wemwbs_status},
        "overall": {"score": (gad7_score + phq9_score + pss_score - wemwbs_score), "status": overall_status}
    }

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    if users.find_one({"email": data["email"]}):
        return jsonify({"message": "User already exists!"}), 400
    data["mental_health_score"] = None
    data["emotion_analysis"] = None
    data["questionnaire_completed"] = False
    data["questionnaire_answers"] = {}
    users.insert_one(data)
    return jsonify({"message": "User registered successfully!"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    print("Received Login Request:", data)
    user = users.find_one({"email": data["email"]})
    
    if not user:
        return jsonify({"message": "User not found!"}), 404
    
    print("User Found in DB:", user)

    if user["password"] != data["password"]:
        return jsonify({"message": "Incorrect password!"}), 401

    return jsonify({
        "message": "Login successful!",
        "mental_health_score": user.get("mental_health_score"),
        "emotion_analysis": user.get("emotion_analysis"),
        "questionnaire_completed": user.get("questionnaire_completed", False),
        "questionnaire_answers": user.get("questionnaire_answers", {})
    }), 200

@app.route("/profile", methods=["GET"])
def profile():
    email = request.headers.get("User-Email")
    if not email:
        return jsonify({"error": "User email missing in request"}), 400
    user = users.find_one({"email": email}, {"_id": 0, "password": 0})
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user)

@app.route("/submit-questionnaire", methods=["POST"])
def submit_questionnaire():
    try:
        data = request.json
        answers = data.get("answers", {})
        email = data.get("email")

        if not email or not answers or len(answers) == 0:  # Check if answers is empty
            return jsonify({"status": False, "message": "Answers or email missing"}), 400

        scores = calculate_scores(answers)
        user = users.find_one({"email": email})
        if not user:
            return jsonify({"status": False, "message": "User not found"}), 404

        users.update_one(
            {"email": email},
            {
                "$set": {
                    "mental_health_score": scores["overall"]["score"],
                    "emotion_analysis": scores,
                    "questionnaire_completed": True,
                    "questionnaire_answers": answers
                }
            }
        )

        return jsonify({
            "status": True,
            "score": scores["overall"]["score"],
            "status": scores["overall"]["status"],
            "details": scores
        }), 200
    
    except Exception as e:
        return jsonify({"status": False, "message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)