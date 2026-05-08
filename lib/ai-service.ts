import { supabase } from "./supabaseClient";

export async function getCognitiveAdvice(message: string) {
  try {
    const { data, error } = await supabase.functions.invoke('cognitive-assistant', {
      body: { user_message: message }
    });

    if (error) throw error;
    return data.advice;
  } catch (err) {
    console.error("Cognitive Sync Error:", err);
    return "I'm having trouble syncing with your cognitive field right now. Please try again.";
  }
}
