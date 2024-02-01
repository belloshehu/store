import { useState } from "react";
import { Row, useAsyncDebounce } from "react-table";
import tw from "twin.macro";
import { FilterProps } from "../types";

const StyledFilter = tw.input`
   p-3 
   rounded-full
   border-primary 
   focus:border-2
   border-[1px]
   outline-none
   w-full
   md:w-2/5
   mx-auto 
   my-2
   text-center
`;

export const Filter = ({
  preGlobalFilteredRows,
  setGlobalFilter,
  globalFilter,
}: FilterProps) => {
  const [value, setValue] = useState(globalFilter);
  const count = preGlobalFilteredRows.length;

  const onChange = useAsyncDebounce(
    (value) => setGlobalFilter(value || undefined),
    200
  );

  return (
    <StyledFilter
      placeholder={`${count} items`}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      value={value || ""}
    />
  );
};
