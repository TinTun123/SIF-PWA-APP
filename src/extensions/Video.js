import { Node } from '@tiptap/core'

export const CustomVideo = Node.create({
  name: 'customVideo',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      controls: {
        default: true,
      },
      width: {
        default: '100%',
      },
      height: {
        default: 'auto',
      },
    }
  },

  parseHTML() {
    return [{ tag: 'video' }]
  },

  renderHTML({ HTMLAttributes }) {
    // Ensure we never create an <audio> element
    return ['video', { ...HTMLAttributes, controls: true, style: 'border-radius:16px;' }]
  },

  addCommands() {
    return {
      setVideo:
        (options) =>
        ({ chain }) => {
          if (!options?.src) return false
          return chain()
            .insertContent({
              type: this.name,
              attrs: options,
            })
            .run()
        },
    }
  },
})
