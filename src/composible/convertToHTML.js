import { generateHTML } from '@tiptap/core'

// Custom extensions
import { CustomHeading } from '@/extensions/CustomHeading'
import { CustomBulletList, CustomOrderedList } from '@/extensions/CustomLists'
import { IndentParagraph } from '@/extensions/IndentParagraph'
import { CustomTextStyle } from '@/extensions/CustomTextStyle'
import { CustomVideo } from '@/extensions/Video'

import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import TextAlign from '@tiptap/extension-text-align'
import ListItem from '@tiptap/extension-list-item'
import HardBreak from '@tiptap/extension-hard-break'
import { Dropcursor } from '@tiptap/extensions'
import ImageResize from 'tiptap-extension-resize-image'
import { CustomResizeImage } from '@/extensions/FloatingResizeImage'

export function converToHTML(content) {
  return generateHTML(content, [
    Document,
    Text,
    Bold,
    Italic,
    Dropcursor,
    CustomResizeImage.configure({
      inline: true,
    }),
    ListItem,
    CustomBulletList,
    CustomOrderedList,
    IndentParagraph,
    CustomTextStyle,
    CustomVideo,
    HardBreak,
    CustomHeading.configure({ levels: [1, 2, 3] }),
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
  ])
}
