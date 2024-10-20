export type ProductsState = {
  items: Product[];
  loading: boolean;
  error: string | null;
  categories: string[]; // Added categories to state
}

export type CartProduct = {
  discountPercentage?: number;
  discountedPrice?: number;
  id: number;
  price: number;
  quantity: number;
  thumbnail: string;
  title: string;
  total?: number;
};

export type Product = {
  availabilityStatus: string;
  brand: string;
  category: string;
  description: string;
  dimensions: {
    depth: number;
    height: number;
    width: number;
  };
  discountPercentage: number;
  id: number;
  images: string[];
  meta: {
    barcode: string;
    createdAt: string;
    qrCode: string;
    updatedAt: string;
  };
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: [
    {
      comment: string;
      date: string;
      rating: number;
      reviewerEmail: string;
      reviewerName: string;
    },
  ];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
};
