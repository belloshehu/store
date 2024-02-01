import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ModalType, Product } from "../types";
import { FaTrash, FaPencilAlt, FaArrowDown, FaArrowUp } from "react-icons/fa";
import {
  Column,
  Hooks,
  useTable,
  Row,
  useSortBy,
  useFilters,
  useGlobalFilter,
} from "react-table";
import { Image } from "./Image";
import { Filter } from "./Filter";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import Modal from "./Modal";
import tw from "twin.macro";
import Loading from "./Loading";

const TableHeader = tw.th`
   p-1 
   md:p-4
   bg-black
   text-white
   capitalize
   text-sm 
   md:text-xl
`;

const TableRow = tw.tr`
  hover:scale-[101%]
  duration-100
  transition-all
  border-4
`;

const TableHead = tw.thead`
   p-2 
   md:p-4
`;

const TableBody = tw.tbody`
   border
   border-collapse
`;

const Table = tw.table`
   p-2
   border-2
   w-full
   text-left
`;

const ProductTableWrapper = tw.div`  
    flex 
    flex-col 
    gap-5 
    md:gap-10
    items-center
    w-full
`;

const DeleteButton = tw(FaTrash)`  
    text-sm 
    md:text-xl 
    text-red-500
`;

const EditButton = tw(FaPencilAlt)`  
    text-sm 
    md:text-xl 
    text-black
`;

const ActionWrapper = tw.div`  
    flex 
    flex-row 
    items-center 
    gap-3 
    justify-evenly
`;

const NoProductWrapper = tw.div`  
   w-full 
   h-full 
   m-auto 
   p-5
`;

const NoProductText = tw.h1` 
   text-xl 
   text-red-500 
   text-center
`;

const TableData = tw.td`
p-1 md:p-4 
table-cell
underline
`;

export const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [form, setForm] = useState<{
    actionType: "edit" | "add";
    show: boolean;
  }>();
  const [modal, setModal] = useState<ModalType>({
    message: "product added",
    show: false,
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | {}>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
      } catch (error) {
        console.log("Error fetching product ...", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const data = useMemo(() => [...products], [products]);

  const getProductColumns = (products: Product[], filter: string[]) => {
    return products[0]
      ? Object.keys(products[0])
          .filter((key) => !filter.includes(key))
          .map((key) => {
            if (key === "discountPercentage") {
              return { Header: "discount", accessor: key };
            }
            return { Header: key, accessor: key };
          })
      : [];
  };

  const productColumns = useMemo(
    () =>
      getProductColumns(products, [
        "thumbnail",
        "brand",
        "description",
        "category",
        "rating",
        "id",
      ]),
    [products]
  );

  const isEvenRow = (index: number) => index % 2 === 0;

  const tableHooks = (hooks: Hooks) => {
    hooks.visibleColumns.push((columns) =>
      [
        {
          id: "name",
          Header: "name",
          Cell: ({ row }: { row: Row }) => {
            return (
              <TableData
                className="underline"
                onClick={() => {
                  handleClick(row.values.title);
                }}>
                {row.values.title}
              </TableData>
            );
          },
        },
        ...columns,
        {
          id: "image",
          Header: "Image",
          Cell: ({ row }: { row: Row }) => {
            return <Image url={row.values.images[0]} alt={row.values.title} />;
          },
        },
        {
          Header: "Actions",
          id: "actions",
          Cell: ({ row }: { row: Row }) => {
            return (
              <ActionWrapper>
                <DeleteButton
                  onClick={() => {
                    handleProductDelete(row.values.title);
                  }}
                />
                <EditButton
                  onClick={() => handleProductEdit(row.values.title)}
                />
              </ActionWrapper>
            );
          },
        },
      ].filter(
        (column) =>
          !["images", "title"].includes(
            column.Header?.toString().toLowerCase()!
          )
      )
    );
  };

  const {
    getTableProps,
    prepareRow,
    getTableBodyProps,
    headerGroups,
    rows,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
  } = useTable(
    { columns: productColumns as Column[], data },
    useFilters,
    useGlobalFilter,
    tableHooks,
    useSortBy
  );

  const getProductID = (productTitle: string) => {
    const { id } = products.find(
      (product) => product.title === productTitle
    ) as Product;
    return id;
  };

  const handleClick = (productTitle: string) => {
    // get ID of a product with title
    const { id: productID } = products.find(
      (product) => product.title === productTitle
    ) as Product;
    navigate(`/product/${productID}`);
  };

  const handleProductEdit = (productName: string) => {
    // Edit a product with a matching ID
    const product = products.find((product) => product.title === productName);
    console.log(product, productName);
    setSelectedProduct(product);
    setForm({ actionType: "edit", show: true });
  };

  const handleProductDelete = async (productName: string) => {
    // Delete a product with a matching ID
    const productID = getProductID(productName);
    if (productID) {
      try {
        const res = await axios.delete(
          `https://dummyjson.com/products/${productID}`
        );

        // update product array
        const withoutDeletedProduct = products.filter(
          (product) => product.id !== productID
        );
        setProducts(withoutDeletedProduct);
        setModal({ message: `Product deleted`, show: true });
      } catch (error) {
        setModal({ message: `Failed to delete product`, show: true });
        console.log(error);
      }
    }
  };

  if (loading) return <Loading message="Loading ... " />;
  if (products.length === 0)
    return (
      <NoProductWrapper>
        <NoProductText>
          Failed to fetch products. Check your internet
        </NoProductText>
      </NoProductWrapper>
    );
  return (
    <>
      <ProductTableWrapper>
        <Filter
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={globalFilter}
        />

        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableHeader
                    {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaArrowDown className="inline pl-1" />
                      ) : (
                        <FaArrowUp className="inline pl-1 " />
                      )
                    ) : (
                      ""
                    )}
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
      </ProductTableWrapper>
      {form?.show && (
        <ProductForm
          setForm={setForm}
          actionType={form?.actionType}
          product={selectedProduct as Product}
          setProducts={setProducts}
          products={products}
        />
      )}
      {modal.show && <Modal message={modal.message} setModal={setModal} />}
    </>
  );
};
