import { createUserContent, createPartFromUri, ApiError } from "@google/genai";
import ai from "../config/gemini";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const COMMAND = `

You are an image forensic assistant. I will provide a photo (URL or base64). Determine whether this image plausibly shows a user performing a real recycling action (e.g., placing recyclable materials into a recycling bin, deposit at collection point). 

Return a JSON object with these keys:
- is_recycle: "yes" / "no"
- confidence: number between 0 and 1
- reasons: array of short reasons (what in the image supports your conclusion)
- signs_of_editing: array of any detected signs of manipulation (e.g., inconsistent lighting, blurring, cloned regions, unnatural edges, metadata absent)
- suggested_checks: array of follow-up checks (e.g., "check EXIF", "reverse image search", "compare with user profile photos", "request short video", "check GPS tag")
- proof_extracts: if applicable, brief text describing detected visual evidence (e.g., "visible recycling bin with ⟂ symbol at left, two plastic bottles partially inserted")

Be concise and factual. If you cannot decide, set is_recycle to "uncertain" and provide the best next steps from suggested_checks.

`;

async function aiVerification(file: File) {
  const MAX_RETRIES = 5;
  let attempt = 0;
  while (attempt < MAX_RETRIES) {
    attempt++;
    try {
      const image = await ai.files.upload({
        file: file,
      });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          createUserContent([
            COMMAND,
            createPartFromUri(image.uri as string, image.mimeType as string),
          ]),
        ],
      });
      return response.text;
    } catch (error) {
      // Check specifically for the 503 UNAVAILABLE or other rate limit errors (like 429)
      if (
        (error instanceof ApiError && error.status === 503) ||
        (error instanceof ApiError && error.status === 429)
      ) {
        console.warn(
          `AI Verification failed on attempt ${attempt} with status ${error.status}. Retrying...`
        );

        if (attempt < MAX_RETRIES) {
          // Exponential Backoff calculation (e.g., 2^attempt * 1000ms + jitter)
          const delay = Math.pow(2, attempt) * 1000 + Math.random() * 500;
          await sleep(delay);
        } else {
          // Max retries reached
          console.error("AI Verification failed after maximum retries.");
          // Re-throw the last error to be handled by the POST route
          throw error;
        }
      } else {
        // Re-throw any other unexpected error (e.g., bad request 400, internal server error 500)
        throw error;
      }
    }
  }

  // const image = await ai.files.upload({
  //   file: path,
  // });
  // const response = await ai.models.generateContent({
  //   model: "gemini-2.5-flash",
  //   contents: [
  //     createUserContent([
  //       "Tell me about this instrument",
  //       createPartFromUri(image.uri as string, image.mimeType as string),
  //     ]),
  //   ],
  // });
  // return response.text;
}

export default aiVerification;
