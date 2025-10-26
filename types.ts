
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface FunnelStep {
  id: string; // Unique ID for React keys and targeting
  upsellProduct: Product;
  downsellProduct: Product | null;
}
