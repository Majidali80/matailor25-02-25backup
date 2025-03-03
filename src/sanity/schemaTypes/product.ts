import { defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    // Basic Product Fields
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "productImage",
      title: "Product Image",
      type: "image",
      validation: (rule) => rule.required(),
      options: {
        hotspot: true, // Allow cropping
      },
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title", // Use title field as the source for the slug
      },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required(),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "inventory",
      title: "Inventory",
      type: "number",
    },
    {
      name: "colours",
      title: "Colours",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "sout",
      title: "Sout Fabric",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "discountPercentage",
      title: "Discount Percentage",
      type: "number",
    },
    {
      name: "isNew",
      title: "New Badge",
      type: "boolean",
    },
    {
      name: "fabricType",
      title: "Fabric Type",
      type: "string",
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'careInstructions',
      title: 'Care Instructions',
      type: 'string',
    },
    {
      name: 'availability',
      title: 'Availability',
      type: 'string',
    },
    {
      name: 'shippingInformation',
      title: 'Shipping Information',
      type: 'string',
    },
    {
      name: 'specialOffers',
      title: 'Special Offers',
      type: 'string',
    },
    {
      name: 'isNewArrival',
      title: 'Is New Arrival',
      type: 'boolean',
    },
    {
      name: 'isBestSeller',
      title: 'Is Best Seller',
      type: 'boolean',
    },
    
    // Stitching Order Fields
    {
      name: 'designDetails',
      title: 'Design Details',
      type: 'string',
    },
    {
      name: 'priceArray',
      title: 'Price Adjustments',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'item', title: 'Item', type: 'string' },
            { name: 'price', title: 'Price', type: 'number' },
          ],
        },
      ],
    },
    {
      name: 'shirtSizes',
      title: 'Shirt Sizes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'size', title: 'Size', type: 'string' },
            { name: 'length', title: 'Length', type: 'number' },
            { name: 'armHole', title: 'Arm Hole', type: 'number' },
            { name: 'shoulder', title: 'Shoulder', type: 'number' },
            { name: 'chest', title: 'Chest', type: 'number' },
            { name: 'waist', title: 'Waist', type: 'number' },
            { name: 'hips', title: 'Hips', type: 'number' },
            { name: 'daman', title: 'Daman', type: 'number' },
            { name: 'sleeves', title: 'Sleeves', type: 'number' },
            { name: 'cuff', title: 'Cuff', type: 'number' },
          ],
        },
      ],
    },
    {
      name: 'trouserSizes',
      title: 'Trouser Sizes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'size', title: 'Size', type: 'string' },
            { name: 'length', title: 'Length', type: 'number' },
            { name: 'waist', title: 'Waist', type: 'number' },
            { name: 'hips', title: 'Hips', type: 'number' },
            { name: 'pancha', title: 'Pancha', type: 'number' },
          ],
        },
      ],
    },
    {
      name: 'uploadDesign',
      title: 'Upload Design',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'pickupCharges',
      title: 'Pickup Charges',
      type: 'number',
    },
    {
      name: 'estimatedTime',
      title: 'Estimated Time',
      type: 'string',
    },
    {
      name: 'orderStatus',
      title: 'Order Status',
      type: 'string',
      options: {
        list: ['Pending', 'In Progress', 'Completed', 'Shipped'],
      },
    },
    {
      name: "materials",
      title: "Materials",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
});
