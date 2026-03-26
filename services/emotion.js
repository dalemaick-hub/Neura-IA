export function detectEmotion(text) { 
  const t = text?.toLowerCase() || ""; 

  if (t.includes("estres") || t.includes("agobiado")) return "stress"; 
  if (t.includes("triste") || t.includes("solo")) return "sadness"; 
  if (t.includes("feliz") || t.includes("contento")) return "happiness"; 
  if (t.includes("ansiedad") || t.includes("nervioso")) return "anxiety"; 

  return "neutral"; 
}
