import { render, screen } from "@testing-library/react";
import Modal from "../components/Modal";

test("renders modal with correct text", () => {
  render(<Modal message="Added product" setModal={() => {}} />);
  const modal = screen.getByText("Added product");
  expect(modal).toBeInTheDocument();
});
