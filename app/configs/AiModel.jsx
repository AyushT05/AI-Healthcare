const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const GenerateSymptomAnalysis= model.startChat({
      generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: `I have been facing these symptoms: Cough,Body Pain. Analyze what problem or disease I'm most likely having, and also share the potential solution/treatment for the same in pure JSON format, no disclaimer about you not being able to provide medical diagnosis.`},
        ],
      },
      {
        role: "model",
        parts: [
          {
          text: `\`\`\`json
{
  "symptoms": ["Cough", "Body Pain"],
  "possible_conditions": [
    {
      "condition": "Common Cold",
      "likelihood": "High",
      "description": "A viral infection of the upper respiratory tract.",
      "potential_treatments": [
        "Rest",
        "Hydration (drinking plenty of fluids)",
        "Over-the-counter pain relievers (e.g., acetaminophen, ibuprofen) for body pain and fever",
        "Decongestants to relieve nasal congestion",
        "Cough suppressants or expectorants for cough relief",
        "Warm saltwater gargle for sore throat"
      ]
    },
    {
      "condition": "Influenza (Flu)",
      "likelihood": "Moderate",
      "description": "A contagious respiratory illness caused by influenza viruses.",
      "potential_treatments": [
        "Rest",
        "Hydration (drinking plenty of fluids)",
        "Antiviral medications (e.g., oseltamivir, zanamivir) if started within 48 hours of symptom onset (consult a doctor)",
        "Over-the-counter pain relievers (e.g., acetaminophen, ibuprofen) for body pain and fever",
        "Cough suppressants or expectorants for cough relief"
      ]
    },
    {
      "condition": "COVID-19",
      "likelihood": "Moderate",
      "description": "A respiratory illness caused by the SARS-CoV-2 virus.",
      "potential_treatments": [
        "Rest",
        "Isolation to prevent spread",
        "Hydration (drinking plenty of fluids)",
        "Over-the-counter pain relievers (e.g., acetaminophen, ibuprofen) for body pain and fever",
        "Cough suppressants or expectorants for cough relief",
        "Antiviral medications (e.g., Paxlovid) if eligible (consult a doctor)",
        "Monoclonal antibody treatments (if eligible and available, consult a doctor)",
        "Supportive care (oxygen, ventilation) if needed in severe cases"
      ]
    },
    {
      "condition": "Bronchitis",
      "likelihood": "Low",
      "description": "Inflammation of the lining of the bronchial tubes.",
      "potential_treatments": [
        "Rest",
        "Hydration (drinking plenty of fluids)",
        "Cough suppressants or expectorants for cough relief",
        "Bronchodilators (inhalers) to open airways (prescribed by a doctor)",
        "Antibiotics (if bacterial infection is suspected, prescribed by a doctor)",
        "Over-the-counter pain relievers (e.g., acetaminophen, ibuprofen) for body pain and fever"
      ]
    },
       {
      "condition": "Pneumonia",
      "likelihood": "Very Low",
      "description": "Infection that inflames air sacs in one or both lungs, which may fill with fluid.",
      "potential_treatments": [
        "Antibiotics (if bacterial infection, prescribed by a doctor)",
        "Antiviral medications (if viral infection, prescribed by a doctor)",
        "Antifungal medications (if fungal infection, prescribed by a doctor)",
        "Rest",
        "Hydration",
        "Pain relievers",
        "Oxygen therapy (severe cases)"
      ]
    }
  ],
  "important_note": "The likelihood scores are relative and depend on many factors.  This is not an exhaustive list, and other conditions could be possible. Consult with a healthcare professional for an accurate diagnosis and treatment plan."
}
\`\`\``,},
        ],
      },
    ],
  });
  
    //const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    //console.log(result.response.text());
  