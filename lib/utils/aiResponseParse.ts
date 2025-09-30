export function parseAiResponse(res: string) {
  let aiResponse = res;

  if (aiResponse.startsWith("```json")) {
    aiResponse = aiResponse.substring("```json".length);
  } else if (aiResponse.startsWith("```")) {
    aiResponse = aiResponse.substring("```".length);
  }
  if (aiResponse.endsWith("```")) {
    aiResponse = aiResponse.substring(0, aiResponse.length - "```".length);
  }
  aiResponse = aiResponse.trim();

  return JSON.parse(aiResponse);
}
