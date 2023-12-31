export interface Product {
  _id: string;
  SKU: string;
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  favourite: boolean;
  createDate: Date;
  updatedDate: Date;
  __v: number;
}
