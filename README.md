# 🧠 AI Healthcare Assistant

The **AI Healthcare Assistant** is an intelligent web-based application that allows users to enter their symptoms and receive an AI-powered health analysis. The system evaluates symptoms, predicts probable diseases in order of likelihood, and suggests possible treatments. All analyses are securely saved in the user's report section, accessible after login or registration.

---

## 🚀 Features

- 🤖 **AI Symptom Analysis:**  
  Users can enter symptoms in natural language, and the AI will analyse them using medical datasets and language models.
  ![Symptoms Input](./assets/Symptoms.jpg)
  <p align="center">
  <img src="./assets/Symptoms.jpg" alt="AI Healthcare Dashboard" width="600"/>
  </p>



- 📊 **Disease Prediction:**  
  The system generates a ranked list of probable diseases, arranged from most to least likely.

- 💊 **Treatment Suggestions:**  
  Provides AI-suggested treatments or next steps for each predicted disease.
  ![Disease Prediction and Treatment Suggestion](./assets/AnalysisReport.jpg)
  ![Precautions](./assets/Precaustions.jpg)



- 🔐 **User Authentication:**  
  Users must **register or log in** to access personalized health reports.

- 🧾 **Report Storage:**  
  All analyses are saved to the user's report dashboard for future reference.
  ![List of Analysis](./assets/AnalysisList.jpg)


---

## 🏗️ Tech Stack

- **Frontend:** Next.js  
- **Backend:** Node.js 
- **Database:** Drizzle POSTGRESQL
- **AI Model:** Gemini 2.0 flash 
- **Authentication:** Clerk 

---