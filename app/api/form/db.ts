import { sql } from "@vercel/postgres";

export async function createFormSubmissionsTable() {
  try {
    await sql`
     CREATE TABLE IF NOT EXISTS form_submissions (
       email TEXT PRIMARY KEY,
       interested_in_beta TEXT NOT NULL,
       cancellation_notifications BOOLEAN NOT NULL DEFAULT false,
       appointment_reminders BOOLEAN NOT NULL DEFAULT false,
       prescription_reminders BOOLEAN NOT NULL DEFAULT false,
       symptom_analysis BOOLEAN NOT NULL DEFAULT false,
       other_feature BOOLEAN NOT NULL DEFAULT false,
       other_feature_description TEXT,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
     );
   `;
    console.log("Form submissions table created successfully");
  } catch (error) {
    console.error("Error creating form submissions table:", error);
    throw error;
  }
}

export async function checkEmailExists(email: string) {
  try {
    console.log("POSTGRES_URL:", process.env.POSTGRES_URL); // debug check

    const result = await sql`
     SELECT EXISTS (
       SELECT 1 FROM form_submissions
       WHERE email = ${email}
     ) AS exists;
   `;
    return result.rows[0].exists;
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw error;
  }
}

export async function saveFormSubmission({
  email,
  interestedInBeta,
  features,
  otherFeature,
}: {
  email: string;
  interestedInBeta: string;
  features: {
    cancellationNotifications: boolean;
    appointmentReminders: boolean;
    prescriptionReminders: boolean;
    symptomAnalysis: boolean;
    other: boolean;
  };
  otherFeature?: string;
}) {
  try {
    await sql`
     INSERT INTO form_submissions (
       email,
       interested_in_beta,
       cancellation_notifications,
       appointment_reminders,
       prescription_reminders,
       symptom_analysis,
       other_feature,
       other_feature_description
     ) VALUES (
       ${email},
       ${interestedInBeta},
       ${features.cancellationNotifications},
       ${features.appointmentReminders},
       ${features.prescriptionReminders},
       ${features.symptomAnalysis},
       ${features.other},
       ${otherFeature || null}
     )
     ON CONFLICT (email) DO UPDATE SET
       interested_in_beta = ${interestedInBeta},
       cancellation_notifications = ${features.cancellationNotifications},
       appointment_reminders = ${features.appointmentReminders},
       prescription_reminders = ${features.prescriptionReminders},
       symptom_analysis = ${features.symptomAnalysis},
       other_feature = ${features.other},
       other_feature_description = ${otherFeature || null}
   `;
    return true;
  } catch (error) {
    console.error("Error saving form submission:", error);
    throw error;
  }
}
