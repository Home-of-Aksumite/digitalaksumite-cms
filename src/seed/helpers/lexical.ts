export function lexicalText(text: string) {
  return {
    root: {
      type: 'root',
      version: 1,
      format: '',
      indent: 0,
      direction: 'ltr',
      children: [
        {
          type: 'paragraph',
          version: 1,
          format: '',
          indent: 0,
          direction: 'ltr',
          children: [
            {
              type: 'text',
              version: 1,
              text,
              format: 0,
              style: '',
              mode: 'normal',
              detail: 0,
            },
          ],
        },
      ],
    },
  } as unknown as Record<string, unknown>
}

export function lexicalParagraphs(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      version: 1,
      format: '',
      indent: 0,
      direction: 'ltr',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        children: [
          {
            type: 'text',
            version: 1,
            text,
            format: 0,
            style: '',
            mode: 'normal',
            detail: 0,
          },
        ],
      })),
    },
  } as unknown as Record<string, unknown>
}
