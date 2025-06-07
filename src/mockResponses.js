export function getMockResponse(model, prompt, temperature = 0.7) {
  if (!prompt) return "";
  return `${model} response for: "${prompt}" (temperature: ${temperature.toFixed(
    1
  )})`;
}
