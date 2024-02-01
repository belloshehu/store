import { render, screen } from "@testing-library/react";
import ProductForm from "../components/ProductForm";

test("renders product form with submit button", () => {
  render(
    <ProductForm
      actionType="edit"
      product={{
        title: "phone",
        images: ["image.png"],
        id: 1,
        description: "phone",
        price: 2,
        rating: 3,
        stock: 34,
        brand: "techno",
        category: "electronics",
        discountPercentage: 0.4,
        thumbnail: "image.png",
      }}
      products={[]}
      setForm={() => {}}
      setProducts={() => {}}
    />
  );
  const submitButton = screen.getByText(/submit/i);
  expect(submitButton).toBeInTheDocument();
});

test("renders product form", () => {
  render(
    <ProductForm
      actionType="edit"
      product={{
        title: "phone",
        images: ["image.png"],
        id: 1,
        description: "phone",
        price: 2,
        rating: 3,
        stock: 34,
        brand: "techno",
        category: "electronics",
        discountPercentage: 0.4,
        thumbnail: "image.png",
      }}
      products={[]}
      setForm={() => {}}
      setProducts={() => {}}
    />
  );

  const submitButton = screen.getByText(/submit/i);
  expect(submitButton).toBeInTheDocument();

  const titleLabel = screen.getByText(/title/i);
  expect(titleLabel).toBeInTheDocument();

  const stockLabel = screen.getByText(/stock/i);
  expect(stockLabel).toBeInTheDocument();
});

test("renders product form with submit button", () => {
  render(
    <ProductForm
      actionType="edit"
      product={{
        title: "phone",
        images: ["image.png"],
        id: 1,
        description: "phone",
        price: 2,
        rating: 3,
        stock: 34,
        brand: "techno",
        category: "electronics",
        discountPercentage: 0.4,
        thumbnail: "image.png",
      }}
      products={[]}
      setForm={() => {}}
      setProducts={() => {}}
    />
  );
  const submitButton = screen.getByText(/submit/i);
  expect(submitButton).toBeInTheDocument();
});

test("renders form without submit button", () => {
  render(
    <ProductForm
      actionType="edit"
      product={{
        title: "phone",
        images: ["image.png"],
        id: 1,
        description: "phone",
        price: 2,
        rating: 3,
        stock: 34,
        brand: "techno",
        category: "electronics",
        discountPercentage: 0.4,
        thumbnail: "image.png",
      }}
      products={[]}
      setForm={() => {}}
      setProducts={() => {}}
    />
  );

  const submitButton = screen.queryByText(/send/i);
  expect(submitButton).not.toBeInTheDocument();
});
