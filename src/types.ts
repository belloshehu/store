import { Filters, Row } from "react-table";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail?: string;
  images: string[];
}

export interface FilterProps {
  preGlobalFilteredRows: Row<{}>[];
  setGlobalFilter: (filterValue: string | number) => void;
  globalFilter: any;
}

export interface Form {
  actionType: "edit" | "add";
  show: boolean;
}
export interface ProductFormProps {
  setForm: (form: Form) => void;
  product: Product;
  products: Product[];
  setProducts: (products: Product[]) => void;
  actionType: "edit" | "add";
}

export interface ModalProps {
  message: string;
  setModal: (modal: ModalType) => void;
}

export interface ModalType {
  message: string;
  show: boolean;
}

export interface ImageProp {
  url: string;
  alt: string;
}
