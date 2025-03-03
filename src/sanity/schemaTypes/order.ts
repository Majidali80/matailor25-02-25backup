// In your Sanity schema file (e.g., order.js)
export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'customer',
      title: 'Customer',
      type: 'object',
      fields: [
        { name: 'firstName', title: 'First Name', type: 'string' },
        { name: 'lastName', title: 'Last Name', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'phone', title: 'Phone', type: 'string' },
        {
          name: 'address',
          title: 'Address',
          type: 'object',
          fields: [
            { name: 'street1', title: 'Street 1', type: 'string' },
            { name: 'street2', title: 'Street 2', type: 'string' },
            { name: 'city', title: 'City', type: 'string' },
            { name: 'country', title: 'Country', type: 'string' },
          ],
        },
        { name: 'subscribe', title: 'Subscribe to Newsletter', type: 'boolean' },
      ],
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'product', title: 'Product', type: 'reference', to: [{ type: 'product' }] },
            { name: 'quantity', title: 'Quantity', type: 'number' },
            { name: 'price', title: 'Price', type: 'number' },
            {
              name: 'customization',
              title: 'Customization Details',
              type: 'object',
              fields: [
                { name: 'designType', title: 'Design Type', type: 'string' },
                { name: 'fabricType', title: 'Fabric Type', type: 'string' },
                {
                  name: 'measurements',
                  title: 'Measurements',
                  type: 'object',
                  fields: [
                    { name: 'chest', title: 'Chest', type: 'number' },
                    { name: 'waist', title: 'Waist', type: 'number' },
                    { name: 'hips', title: 'Hips', type: 'number' },
                  ],
                },
                { name: 'additionalNotes', title: 'Additional Notes', type: 'text' },
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
                        { name: 'elastic', title: 'Elastic', type: 'boolean' },
                      ],
                    },
                  ],
                },
                { name: 'sout', title: 'Sout Provided', type: 'boolean' },
                { name: 'category', title: 'Category', type: 'string' },
                {
                  name: 'uploadDesign',
                  title: 'Upload Design',
                  type: 'array',
                  of: [{ type: 'file' }], // For file uploads
                },
              ],
            },
          ],
        },
      ],
    },
    { name: 'paymentMethod', title: 'Payment Method', type: 'string' },
    { name: 'subtotal', title: 'Subtotal', type: 'number' },
    { name: 'shipping', title: 'Shipping', type: 'number' },
    { name: 'discount', title: 'Discount', type: 'number' },
    { name: 'total', title: 'Total', type: 'number' },
    { name: 'orderDate', title: 'Order Date', type: 'datetime' },
    { name: 'notes', title: 'Notes', type: 'text' },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Ready for Dispatch', value: 'readyForDispatch' },
          { title: 'Dispatched', value: 'dispatched' },
          { title: 'Completed', value: 'completed' },
        ],
      },
    },
  ],
};