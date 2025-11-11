import { pgTable, serial, varchar, timestamp, json } from "drizzle-orm/pg-core";

export const AnalysisList = pgTable('AnalysisList', {
  id: serial('id').primaryKey(),
  analysisId: varchar('analysisId', { length: 255 }).notNull(),
  analysis: json('analysis').notNull(),
  userid: varchar('userid', { length: 255 }).notNull(),
  symptom: varchar('symptom', { length: 1000 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});
