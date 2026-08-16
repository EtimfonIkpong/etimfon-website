import {defineField, defineType} from 'sanity'

export const bookType = defineType({
  name: 'book',
  title: 'Book',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'cover',
      title: 'Book Cover',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'link',
      title: 'Book Link',
      type: 'url',
      description: 'Optional link to the book.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'cover',
    },

    prepare({title, author, media}) {
      return {
        title,
        subtitle: author,
        media,
      }
    },
  },
})