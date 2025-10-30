// FloatableImage.js
import ResizeImage from 'tiptap-extension-resize-image'

export const FloatableImage = ResizeImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      float: {
        default: null,
        renderHTML: (attributes) => {
          if (!attributes.float) return {}
          return { class: `float-${attributes.float}` }
        },
      },
    }
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setImageFloat:
        (float) =>
        ({ commands }) => {
          return commands.updateAttributes('div', { float })
        },
      unsetImageFloat:
        () =>
        ({ commands }) => {
          return commands.updateAttributes('div', { float: null })
        },
    }
  },
})
