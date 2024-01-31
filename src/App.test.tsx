import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { ProductTable } from "./components/ProductTable";
import { Filter } from "./components/Filter";

test("renders product table", () => {
  render(<ProductTable />);
  const tableTitle = screen.getByText(/title/i);
  expect(tableTitle).toBeInTheDocument();
});

test("renders search input", () => {
  const tableTitle = screen.getByText(/title/i);
  expect(tableTitle).toBeInTheDocument();
});

test("renders product image", () => {
  const tableTitle = screen.getByText(/title/i);
  expect(tableTitle).toBeInTheDocument();
});

test("renders product edit form", () => {
  const tableTitle = screen.getByText(/title/i);
  expect(tableTitle).toBeInTheDocument();
});
