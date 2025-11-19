import { createChatModel } from "./lc-model";
import { AskResult, AskResultSchema } from "./schema";

export async function askStructured(query: string): Promise<AskResult> {
  const { model } = createChatModel();
  const system = "You are a concise asistant. Return only the requested JSON.";
  const user =
    `Summarize for a beginner:\n` +
    `"${query}"\n` +
    `Return fields: summary (short paragraph), confidence (0-1 float).`;

  const structured = model.withStructuredOutput(AskResultSchema);
  const response = await structured.invoke([
    { role: "system", content: system },
    { role: "user", content: user },
  ]);
  return response;
}
