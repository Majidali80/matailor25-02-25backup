// schemas/customer.js

export default {
    name: 'customer',
    title: 'Customer',
    type: 'document',
    fields: [
      {
        name: "customer",
      type: "string",
      title: "Customer",
        description: 'A unique identifier for the customer.',
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      {
        name: 'firstName',
        title: 'First Name',
        type: 'string',
        validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): { (): any; new(): any; max: { (arg0: number): any; new(): any; }; }; new(): any; }; }; }) => Rule.required().min(2).max(50),
      },
      {
        name: 'lastName',
        title: 'Last Name',
        type: 'string',
        validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): { (): any; new(): any; max: { (arg0: number): any; new(): any; }; }; new(): any; }; }; }) => Rule.required().min(2).max(50),
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: (Rule: { required: () => { (): any; new(): any; email: { (): { (): any; new(): any; error: { (arg0: string): any; new(): any; }; }; new(): any; }; }; }) =>
          Rule.required().email().error('Please enter a valid email address'),
      },
      {
        name: 'phone',
        title: 'Phone Number',
        type: 'string',
        validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): { (): any; new(): any; max: { (arg0: number): any; new(): any; }; }; new(): any; }; }; }) => Rule.required().min(10).max(15),
      },
      {
        name: 'totalSpent',
        title: 'Total Spent',
        type: 'number',
        validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): any; new(): any; }; }; }) => Rule.required().min(0),
        description: 'Total money spent by the customer.',
      },
    ],
  };
  