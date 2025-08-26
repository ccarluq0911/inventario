export type Item = {
  id: number;
  sku: string;
  ean13: string;
  quantity: number;
};

export type Movement = {
  id: number;
  item_id: number;
  change: number;
  type: string;
  timestamp: string;
};
