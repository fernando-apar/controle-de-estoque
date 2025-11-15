
export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  purchasePrice: number;
  sellPrice: number;
  photo?: string; // base64 string
  internalCode: string;
  createdAt: string;
}

export enum MovementType {
  IN = 'Entrada',
  OUT = 'Saída',
}

export interface Movement {
  id: string;
  productId: string;
  productName: string;
  type: MovementType;
  quantity: number;
  reason: string;
  date: string;
}

export enum Plan {
  FREE = 'free',
  PREMIUM = 'premium',
}

export interface User {
  id: string;
  email: string;
  name: string;
  plan: Plan;
}
