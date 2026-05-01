// Paste your deployed Google Apps Script Web App URL between the quotes below.
// It should look like: https://script.google.com/macros/s/AKfyc.../exec
export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzRwwBBIkLR1qxlY0-UyjwGehuA8vpx2uJvMlhNJxMOKNoLaeKyrQXvG8cTFp7d26ST/exec";

export type SheetPayload = {
  type: "RSVP" | "WISH";
  guestName: string;
  attendance: string;
  relationship: string;
  message: string;
  userAgent: string;
};

export async function sendToGoogleSheet(data: SheetPayload): Promise<void> {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.startsWith("PASTE_")) {
    throw new Error("Google Script URL is not configured.");
  }

  // Use text/plain to avoid a CORS preflight against Apps Script.
  const res = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(data),
    redirect: "follow",
  });

  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
}
