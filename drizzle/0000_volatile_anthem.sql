CREATE TABLE "AnalysisList" (
	"id" serial PRIMARY KEY NOT NULL,
	"analysisId" varchar(255) NOT NULL,
	"analysis" json NOT NULL,
	"userid" varchar(255) NOT NULL,
	"symptom" varchar(1000) NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
