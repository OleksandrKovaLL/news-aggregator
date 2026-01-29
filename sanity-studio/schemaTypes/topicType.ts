import {defineField, defineType} from 'sanity'

export const topicType = defineType({
  name: 'topic',
  title: 'Topic',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Topic Name',
      type: 'string',
      description: 'Назва топіку (e.g., Technology, Politics)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Ключові слова для визначення топіку',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex колір (#3b82f6)',
      initialValue: '#3b82f6',
      validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Має бути hex: #3b82f6'),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      keywords: 'keywords',
    },
    prepare({title, keywords}) {
      return {
        title,
        subtitle: keywords?.slice(0, 3).join(', '),
      }
    },
  },
})
