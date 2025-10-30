export function convertJsonContent(content) {
  return parseContent(content)
}

function parseContent(value) {
  if (!value) return {}
  try {
    let parsed = JSON.parse(value)

    if (typeof parsed === 'string') {
      parsed = JSON.parse(parsed)
    }

    // If backend only sent `content` array instead of full doc
    if (Array.isArray(parsed)) {
      let data = { type: 'doc', content: parsed }

      return data
    }
    return parsed
  } catch (err) {
    console.warn('Invalid editor JSON:', err)
    return {}
  }
}
