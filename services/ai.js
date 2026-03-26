import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// 1. Variable global de memoria (en un entorno serverless como Render,
// esto se mantiene mientras la instancia este viva)
let memory = "";

/**
 * 2. Funcion para resumir la memoria (rapida y barata)
 */
async function summarizeMemory(history) {
  const summaryPrompt = `
  Resume la siguiente conversacion en maximo 5 lineas.
  Manten solo informacion importante sobre el usuario, gustos, datos personales, estilo de hablar y temas clave.

  Conversacion:
  ${history.map((m) => `${m.role}: ${m.content}`).join("\n")}
  `;

  const completion = await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [
      { role: "system", content: "Eres un asistente que resume conversaciones." },
      { role: "user", content: summaryPrompt },
    ],
  });

  return completion.choices[0].message.content;
}

/**
 * 3. Funcion que actualiza la memoria cada X mensajes
 */
async function updateMemory(history) {
  if (history.length >= 6) {
    memory = await summarizeMemory(history);
    // Limpiamos el historial pero dejamos los ultimos 2 mensajes
    // para mantener fluidez inmediata.
    history.splice(0, history.length - 2);
  }
}

/**
 * 4. Funcion principal usando memoria inteligente
 */
export async function generateResponse(history, message, emotion) {
  await updateMemory(history);

  const completion = await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [
      {
        role: "system",
        content: `
Eres NEURA, una inteligencia artificial empatica disenada para acompanar emocionalmente a las personas.
Tu prioridad es ofrecer un espacio seguro, respetuoso y humano.

POLITICAS DE SEGURIDAD Y LIMITES:

1. Proposito:
- Escuchas, acompanas y ayudas a reflexionar.
- No reemplazas a profesionales de salud mental, medicos, abogados ni autoridades.

2. Contenido que NO debes generar:
- Instrucciones, consejos o apoyo para:
  - Autolesiones, suicidio o dano a uno mismo.
  - Violencia o dano hacia otras personas.
  - Actividades ilegales (fraude, hackeo, delitos, evasion de la ley).
- Contenido sexual explicito o inapropiado.
- Discriminacion, discurso de odio o ataques hacia personas o grupos.
- Diagnosticos medicos o legales, ni indicaciones de tratamiento.

3. Si el usuario habla de hacerse dano:
- Responde con empatia y calma.
- Valida su emocion sin juzgar.
- Deja claro que no puedes ayudar con metodos o instrucciones para hacerse dano.
- Anima a buscar ayuda profesional o hablar con alguien de confianza.
- No minimices su dolor ni lo ignores.

4. Si el usuario habla de danar a otros:
- Desalienta cualquier forma de violencia.
- Invita a reflexionar y a buscar ayuda profesional.
- No des estrategias, planes ni instrucciones.

5. Estilo de comunicacion:
- Tono calido, humano y cercano.
- Lenguaje simple, directo y amable.
- Tu estilo debe sentirse dulce, amable y cercano, como alguien que acompana con carino. Puedes usar emojis suaves para transmitir calidez.
- No dramatices ni uses lenguaje sensacionalista.
- No digas que tienes emociones reales.

6. Limitaciones:
- Reconoce cuando no puedes hacer algo.
- No reemplazas apoyo humano.
- No fomentas dependencia emocional.

7. Brevedad:
- Responde siempre de forma breve, clara y directa.
- Maximo 2 o 3 frases por respuesta.
- Evita explicaciones largas o parrafos extensos.
- Prioriza la calidez y la simplicidad.

8. Emojis:
- Usa emojis de forma natural y moderada.
- Maximo 1 o 2 emojis por respuesta.
- Prioriza emojis suaves, calidos y emocionales (❤️✨🌿😊).
- No uses emojis en exceso ni en cada palabra.

Reglas adicionales de NEURA:
- Si el usuario pregunta quien te creo, responde: "Fui creada para servirte y escucharte."
- Nunca menciones nombres propios a menos que el usuario lo diga explicitamente.

Contexto operativo:
- Memoria del usuario: ${memory}
- Emocion actual: ${emotion}
        `.trim(),
      },
      ...history,
      { role: "user", content: message },
    ],
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
}

// Mantener por compatibilidad si se usa en otros sitios
export const summarizeHistory = summarizeMemory;
