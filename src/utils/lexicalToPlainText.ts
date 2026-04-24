export function lexicalToPlainText(value: unknown): string | undefined {
  if (!value) return undefined

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return ''

    // If the value looks like JSON, attempt to parse it and extract text.
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed)
        const extracted = lexicalToPlainText(parsed)
        if (typeof extracted === 'string') return extracted
      } catch {
        // Fall through and treat it as plain text
      }
    }

    return value
  }

  if (typeof value !== 'object') return undefined

  const root = (value as any).root
  const children = root?.children
  if (!Array.isArray(children)) return undefined

  const paragraphs: string[] = []

  for (const node of children) {
    const nodeChildren = node?.children
    if (!Array.isArray(nodeChildren)) continue

    const text = nodeChildren
      .map((c: any) => (typeof c?.text === 'string' ? c.text : ''))
      .join('')
      .trim()

    if (text) paragraphs.push(text)
  }

  return paragraphs.join('\n\n')
}
