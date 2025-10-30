import { TextStyle } from '@tiptap/extension-text-style'

export const CustomTextStyle = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: (el) => el.style.fontSize || null,
        renderHTML: (attrs) => (attrs.fontSize ? { style: `font-size: ${attrs.fontSize}` } : {}),
      },
      lineHeight: {
        default: null,
        parseHTML: (el) => el.style.lineHeight || null,
        renderHTML: (attrs) =>
          attrs.lineHeight ? { style: `line-height: ${attrs.lineHeight}` } : {},
      },
    }
  },
})
