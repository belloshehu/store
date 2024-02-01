import { Filter } from "../components/Filter";
import { getByRole, render, screen } from "@testing-library/react";
import {
  useTable,
  Column,
  useGlobalFilter,
  useFilters,
  Hooks,
} from "react-table";

const data = [
  {
    title: "phonex",
    price: 120,
    id: 1,
    category: "phone",
  },
  {
    title: "honda",
    price: 12000,
    id: 2,
    category: "vehicle",
  },
  {
    title: "Arduino",
    price: 50,
    id: 3,
    category: "hardware",
  },
];

// get data columns
const columns = Object.keys(data[0]).map((key) => {
  return { Header: key, accessor: key };
});

const tableHooks = (hooks: Hooks) => {
  hooks.visibleColumns.push((columns) => [...columns]);
};

const { preGlobalFilteredRows, setGlobalFilter, globalFilter } = useTable(
  { columns: columns as Column[], data },
  useFilters,
  useGlobalFilter,
  tableHooks
);

test("renders learn react link", () => {
  const { getByRole } = render(
    <Filter
      globalFilter={globalFilter}
      preGlobalFilteredRows={preGlobalFilteredRows}
      setGlobalFilter={setGlobalFilter}
    />
  );

  const inputElement = getByRole("textbox");
  expect(inputElement).toBeInTheDocument();
});
