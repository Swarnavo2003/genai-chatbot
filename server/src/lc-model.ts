import { ChatOpenAI } from "@langchain/openai";
import { loadEnv } from "./env";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export type Provider = "openai" | "gemini";

export function createChatModel(): { provider: Provider; model: any } {
  loadEnv();

  const forced = (process.env.PROVIDER || "").toLowerCase();

  const hadOpenai = !!process.env.OPENAI_API_KEY;
  const hadGemini = !!process.env.GOOGLE_API_KEY;

  const base = { temperature: 0 as const };

  if (forced === "openai" || (!forced && hadOpenai)) {
    return {
      provider: "openai",
      model: new ChatOpenAI({
        ...base,
        model: "gpt-4o-mini",
      }),
    };
  }

  if (forced === "gemini" || (!forced && hadGemini)) {
    console.log(">>> CREATING GEMINI MODEL");
    return {
      provider: "gemini",
      model: new ChatGoogleGenerativeAI({
        ...base,
        model: "gemini-2.0-flash-exp-0205",
      }),
    };
  }

  throw new Error(
    "No AI provider configured. Set OPENAI_API_KEY or GOOGLE_API_KEY in .env"
  );
}
