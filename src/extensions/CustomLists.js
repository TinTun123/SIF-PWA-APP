import { BulletList, OrderedList } from '@tiptap/extension-list'

export const CustomBulletList = BulletList.extend({
  renderHTML() {
    return ['ul', { class: 'list-disc list-inside' }, 0]
  },
})

export const CustomOrderedList = OrderedList.extend({
  renderHTML() {
    return ['ol', { class: 'list-decimal list-inside' }, 0]
  },
})
