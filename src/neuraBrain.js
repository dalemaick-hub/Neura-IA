export function getNeuraResponse(message, profile) {
  const msg = message.toLowerCase()

  let mood = "neutral"

  if (msg.includes("cansado") || msg.includes("estresado")) {
    mood = "estres"
  } else if (msg.includes("feliz") || msg.includes("bien")) {
    mood = "positivo"
  }

  if (mood === "estres") {
    return {
      text: `Entiendo que estás pasando un momento difícil ${profile.name || ""}`,
      mood
    }
  }

  if (mood === "positivo") {
    return {
      text: `Me alegra escuchar eso ${profile.name || ""}`,
      mood
    }
  }

  return {
    text: "Cuéntame más, quiero entenderte mejor.",
    mood
  }
}