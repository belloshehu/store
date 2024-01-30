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
