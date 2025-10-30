import Heading from '@tiptap/extension-heading'

export const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
        parseHTML: (el) => el.getAttribute('id'),
        renderHTML: (attrs) => (attrs.id ? { id: attrs.id } : {}),
      },
    }
  },

  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level
    const classes = {
      1: 'font-bold text-[20px] lg:text-[24px] text-gray-800 border-l-4 px-2 border-[#F94B65]',
      2: 'text-[18px] lg:text-[20px] text-gray-600 relative before:content-[""] before:absolute before:left-0 before:bottom-0 before:h-6 before:w-[80%] before:border-b-3 before:border-[#F94B65] py-2 inline',
      3: 'font-bold text-[16px] text-gray-600',
    }

    return [
      `h${level}`,
      { ...HTMLAttributes, class: `${HTMLAttributes.class || ''} ${classes[level] || ''}` },
      0,
    ]
  },
})
