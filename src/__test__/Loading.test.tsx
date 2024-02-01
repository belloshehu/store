import { render, screen } from "@testing-library/react";
import Loading from "../components/Loading";

test("renders loading component with correct message", () => {
  render(<Loading message="loading" />);
  const modal = screen.getByText("loading");
  expect(modal).toBeInTheDocument();
});

test("loading component with incorrect message", () => {
  render(<Loading message="loading..." />);
  const modal = screen.queryByText("loading");
  expect(modal).not.toBeInTheDocument();
});
