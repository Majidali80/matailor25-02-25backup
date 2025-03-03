import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId: 'ilhf9wt8',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // Ensure this is correct
})

// Create a builder for image URLs
const builder = imageUrlBuilder(client)

// Export the urlFor function
export const urlFor = (source: any) => builder.image(source) // Adjust the type of source as needed

export default client
