import ResizeImage from 'tiptap-extension-resize-image'

export const CustomResizeImage = ResizeImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      wrapperStyle: {
        default: null,
        parseHTML: (element) => element.getAttribute('wrapperstyle'),
        renderHTML: (attributes) => {
          if (!attributes.wrapperStyle) return {}
          return { wrapperstyle: attributes.wrapperStyle }
        },
      },
      containerStyle: {
        default: null,
        parseHTML: (element) => element.getAttribute('containerstyle'),
        renderHTML: (attributes) => {
          if (!attributes.containerStyle) return {}
          return { containerstyle: attributes.containerStyle }
        },
      },
    }
  },

  renderHTML({ HTMLAttributes }) {
    const wrapperStyle = HTMLAttributes.wrapperstyle || ''
    const containerStyle = HTMLAttributes.containerstyle || ''
    const imgAttrs = { ...HTMLAttributes }
    delete imgAttrs.wrapperstyle
    delete imgAttrs.containerstyle

    return ['div', { style: wrapperStyle }, ['div', { style: containerStyle }, ['img', imgAttrs]]]
  },
})
