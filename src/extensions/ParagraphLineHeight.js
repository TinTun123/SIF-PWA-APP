import { Paragraph } from '@tiptap/extension-paragraph'

export const ParagraphLineHeight = Paragraph.extend({
  name: 'paragraphLineHeight',

  addAttributes() {
    return {
      ...this.parent?.(),
      lineHeight: {
        default: '32px',
        parseHTML: (element) => element.style.lineHeight || '32px',
        renderHTML: (attributes) => ({
          style: `line-height: ${attributes.lineHeight}`,
        }),
      },
    }
  },
})
