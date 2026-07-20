export const callClaude = async (prompt, maxTokens = 2000) => {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }]
    })
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `API error ${res.status}`)
  }
  const data = await res.json()
  const text = data.content.map(b => b.text || "").join("")
  const cleaned = text.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim()
  try {
    return JSON.parse(cleaned)
  } catch {
    const lastBrace = cleaned.lastIndexOf('}')
    const truncated = cleaned.substring(0, lastBrace + 1)
    const closeArray = truncated + ']}'
    return JSON.parse(closeArray)
  }
}
