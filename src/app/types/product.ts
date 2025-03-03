export type Product = {
  _id: string;
  title: string;
  productImage: {
    asset: {
      url: string;
    };
  };
  slug: string;
  description: string;
  price: number;
  tags: string[];
  inventory?: number;
  colours: string[];
  sout: string[];
  discountPercentage?: number;
  isNew?: boolean;
  fabricType: string;
  category: string;
  careInstructions: string;
  availability: string;
  shippingInformation: string;
  specialOffers: string;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  stockStatus: "In Stock" | "Out of Stock";

  // Stitching Order Fields
  designDetails?: string;

  shirtSizes: {
    size: string;
    length: number;
    armHole: number;
    shoulder: number;
    chest: number;
    waist: number;
    hips: number;
    daman: number;
    sleeves: number;
    cuff: number;
  }[];

  // Add trouserSizes property
  trouserSizes: {
    size: string;
    length: number;
    waist: number;
    hips: number;
    pancha: number;
  }[];

  // Add priceArray property
  priceArray: {
    item: string;
    price: number;
  }[];

  uploadDesign: {
    asset: {
      url: string;
    };
  } | null;
  pickupCharges?: number;
  estimatedTime?: string;
  orderStatus: "Pending" | "In Progress" | "Completed" | "Shipped";
  materials: string[];

  // Add the types property
  types: string[];

  // Add stockQuantity property
  stockQuantity: number;

  // Add images property
  images: {
    asset: {
      url: string;
    };
  }[];
};
