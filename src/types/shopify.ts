export interface ShopifyVariant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  position: number;
  inventory_policy: string;
  compare_at_price: string | null;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  created_at: string;
  updated_at: string;
  taxable: boolean;
  barcode: string | null;
  fulfillment_service: string;
  grams: number;
  inventory_management: string | null;
  requires_shipping: boolean;
  sku: string | null;
  weight: number;
  weight_unit: string;
  inventory_item_id: number;
  inventory_quantity: number;
  old_inventory_quantity: number;
  admin_graphql_api_id: string;
  image_id: number | null;
}

export interface ShopifyVariantResponse {
  variants: ShopifyVariant[];
}
