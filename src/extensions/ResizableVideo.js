import { Node, mergeAttributes } from '@tiptap/core'

export const ResizableVideo = Node.create({
  name: 'resizableVideo',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      width: { default: '480' },
      height: { default: '270' },
      controls: { default: true },
    }
  },

  parseHTML() {
    return [{ tag: 'video' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['video', mergeAttributes(HTMLAttributes, { controls: true })]
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const container = document.createElement('div')
      container.classList.add('video-wrapper')
      container.style.position = 'relative'
      container.style.display = 'inline-block'

      const video = document.createElement('video')
      video.src = node.attrs.src
      video.controls = true
      video.style.width = node.attrs.width + 'px'
      video.style.height = node.attrs.height + 'px'

      // Create resize handle
      const handle = document.createElement('div')
      handle.style.position = 'absolute'
      handle.style.right = '0'
      handle.style.bottom = '0'
      handle.style.width = '12px'
      handle.style.height = '12px'
      handle.style.cursor = 'nwse-resize'
      handle.style.background = '#999'
      handle.style.borderRadius = '2px'

      // Append elements
      container.appendChild(video)
      container.appendChild(handle)

      // Handle drag resizing
      let startX, startY, startWidth, startHeight

      const onMouseDown = (e) => {
        e.preventDefault()
        startX = e.clientX
        startY = e.clientY
        startWidth = parseInt(video.style.width)
        startHeight = parseInt(video.style.height)
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
      }

      const onMouseMove = (e) => {
        const newWidth = startWidth + (e.clientX - startX)
        const newHeight = startHeight + (e.clientY - startY)

        video.style.width = newWidth + 'px'
        video.style.height = newHeight + 'px'
      }

      const onMouseUp = (e) => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)

        // Persist size changes into ProseMirror document
        const pos = getPos()
        const transaction = editor.state.tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          width: parseInt(video.style.width),
          height: parseInt(video.style.height),
        })
        editor.view.dispatch(transaction)
      }

      handle.addEventListener('mousedown', onMouseDown)

      return {
        dom: container,
        destroy() {
          handle.removeEventListener('mousedown', onMouseDown)
        },
      }
    }
  },
})
