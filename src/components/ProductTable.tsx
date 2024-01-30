import React, { useEffect, useMemo, useState } from "react";
import Table from "./Table";
import { TableHead } from "./TableHead";
import { TableRow } from "./TableRow";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableData } from "./TableData";
import axios from "axios";
import { Product } from "../types";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { Column, HeaderGroup, Hooks, useTable, Row } from "react-table";
import { Image } from "./Image";

export const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
      } catch (error) {
        console.log("Error fetching product ...", error);
      }
    })();
  }, []);

  const data = useMemo(() => [...products], [products]);

  const getProductColumns = (products: Product[], filter: string[]) => {
    return products[0]
      ? Object.keys(products[0])
          .filter((key) => !filter.includes(key))
          .map((key) => {
            return { Header: key, accessor: key };
          })
      : [];
  };

  const productColumns = useMemo(
    () =>
      getProductColumns(products, [
        "thumbnail",
        "brand",
        "id",
        "description",
        "category",
      ]),
    [products]
  );

  const isEvenRow = (index: number) => index % 2 === 0;

  const tableHooks = (hooks: Hooks) => {
    hooks.visibleColumns.push((columns) =>
      [
        ...columns,
        {
          id: "image",
          Header: "Image",
          Cell: ({ row }: { row: Row }) => {
            return <Image src={row.values.images[0]} alt={row.values.title} />;
          },
        },
        {
          Header: "Actions",
          id: "actions",
          Cell: ({}) => {
            return (
              <div className="flex flex-row items-center gap-3 justify-evenly">
                <FaTrash className="text-xl text-red-500" />
                <FaPencilAlt className="text-xl" />
              </div>
            );
          },
        },
      ].filter((column) => column.Header?.toString().toLowerCase() !== "images")
    );
  };
  const { getTableProps, prepareRow, getTableBodyProps, headerGroups, rows } =
    useTable({ columns: productColumns as Column[], data }, tableHooks);
  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers?.map((column) => (
              <TableHeader {...column.getHeaderProps()}>
                {column.render("Header")}
              </TableHeader>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <TableRow
              className={
                isEvenRow(index)
                  ? " bg-slate-100"
                  : "bg-gradient-to-r from-slate-300 to-primary text-slate-200"
              }
              {...row.getRowProps()}>
              {row.cells.map((cell, index) => (
                <TableData {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </TableData>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
