import {defineField, defineType} from 'sanity'

export const allowedSourceType = defineType({
  name: 'allowedSource',
  title: 'Allowed News Source',
  type: 'document',
  fields: [
    defineField({
      name: 'sourceId',
      title: 'Source ID',
      type: 'string',
      description: 'ID джерела з News API (e.g., bbc-news, techcrunch, cnn)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      description: 'Назва для відображення',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Чи активне це джерело',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'displayName',
      subtitle: 'sourceId',
      active: 'isActive',
    },
    prepare({title, subtitle, active}) {
      return {
        title,
        subtitle: `${subtitle} ${active ? '✅' : '❌'}`,
      }
    },
  },
})
