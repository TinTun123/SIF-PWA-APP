import Paragraph from '@tiptap/extension-paragraph'

export const IndentParagraph = Paragraph.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      indentLevel: {
        default: 0,
        parseHTML: (el) => parseInt(el.style.marginLeft) / 40 || 0,
        renderHTML: (attrs) =>
          attrs.indentLevel ? { style: `margin-left: ${attrs.indentLevel * 40}px` } : {},
      },
      lineHeight: {
        default: '32px',
        parseHTML: (element) => element.style.lineHeight || '32px',
        renderHTML: (attributes) => ({
          style: `line-height: ${attributes.lineHeight}`,
        }),
      },
    }
  },

  addCommands() {
    return {
      ...this.parent?.(),
      indent:
        () =>
        ({ chain, state }) => {
          const { indentLevel = 0 } = state.selection.$from.parent.attrs
          return chain()
            .updateAttributes('paragraph', { indentLevel: indentLevel + 1 })
            .run()
        },
      outdent:
        () =>
        ({ chain, state }) => {
          const { indentLevel = 0 } = state.selection.$from.parent.attrs
          return chain()
            .updateAttributes('paragraph', { indentLevel: Math.max(0, indentLevel - 1) })
            .run()
        },
    }
  },
})
