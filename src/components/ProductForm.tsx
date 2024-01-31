import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useEffect, useState } from "react";
import tw from "twin.macro";
import { LiaTimesSolid } from "react-icons/lia";
import { ProductFormProps } from "../types";
import { Backdrop } from "./BackDrop";

const CloseTimes = tw(LiaTimesSolid)` 
    text-red-500 
    font-bold 
    text-2xl 
    md:text-4xl
    absolute 
    top-5 
    right-5
`;
const FieldErrorMessage = tw.small` 
    text-red-500 
    text-left
`;

const FormWrapper = tw.div`  
    w-full
    md:w-1/3 
    mx-auto
    shadow-xl 
    md:p-10 
    p-5 
    bg-slate-200
    border-2 
    border-primary
    rounded-lg
    relative
    overflow-y-auto
`;

const FormControl = tw.div` 
    flex 
    flex-col
    gap-2 
    w-full 
`;

const Label = tw.label`  
    w-full 
    text-left
`;
const InputField = tw(Field)` 
    w-full 
    rounded-md 
    border-[1px] 
    border-primary 
    p-2 
    px-4 
    outline-none
`;

const FormControlWrapper = tw.div` 
    flex 
    flex-col 
    items-center 
    justify-center 
    gap-2 
    md:gap-5 
    w-full
`;

const Button = tw.button` 
    block 
    text-center 
    rounded-full 
    outline-none 
    bg-primary 
    text-white 
    p-2 
    px-3
    w-full
    disabled:bg-green-200
`;

const FormMessage = tw.small`
    text-primary
`;
const ProductForm = ({
  setForm,
  product,
  setProducts,
  products,
  actionType,
}: ProductFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState<{
    text: string;
    type: "error" | "success";
  }>({
    text: "",
    type: "error",
  });

  return (
    <Backdrop>
      <FormWrapper>
        <CloseTimes
          onClick={() => {
            setForm({ actionType: "edit", show: false });
          }}
        />
        <Formik
          initialValues={
            actionType === "edit"
              ? {
                  title: product.title,
                  price: product.price,
                  description: product?.description,
                  rating: product.rating,
                  stock: product.stock,
                }
              : {
                  title: "",
                  price: 0,
                  description: "",
                  rating: 0,
                  stock: 0,
                }
          }
          onSubmit={async (values, { setSubmitting }) => {
            setIsLoading(true);
            if (actionType === "edit") {
              // update when form is loaded with a product data
              try {
                const res = await axios.put(
                  `https://dummyjson.com/products/${product.id}`,
                  values
                );
                setResponseMsg({
                  text: "Product updated successfully",
                  type: "success",
                });

                // update the product in the array of the products
                const withUpdatedProduct = products.map((productItem) => {
                  if (productItem.id === product.id) return res.data;
                  return productItem;
                });
                setProducts(withUpdatedProduct);
              } catch (error) {
                setResponseMsg({ text: "Failed to update", type: "error" });
              } finally {
                setIsLoading(false);
              }
            } else {
              // Create new product when form is loaded without
              try {
                const res = await axios.post(
                  "https://dummyjson.com/products/add",
                  values
                );
                setResponseMsg({
                  text: "Product added successfully",
                  type: "success",
                });
                // append new product to the product array
                console.log(res.data);
                setProducts([...products, res.data]);
              } catch (error) {
                setResponseMsg({
                  text: "Failed to add product",
                  type: "success",
                });
                console.log(error);
              } finally {
                setIsLoading(false);
              }
            }
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Title required"),
            description: Yup.string().required("Description required"),
            price: Yup.string().required("Price required"),
            rating: Yup.number()
              .min(0, "Minimum rating is 0")
              .max(5, "Maximum rating is 5")
              .required("Rating required"),
            stock: Yup.number()
              .required("Product stock required")
              .min(0, "Minimum stock is 1"),
          })}>
          <Form>
            <FormControlWrapper>
              {responseMsg.type === "success" ? (
                <FormMessage className="text-primary">
                  {responseMsg.text}
                </FormMessage>
              ) : (
                <FormMessage className="text-red-500">
                  {responseMsg.text}
                </FormMessage>
              )}

              <FormControl>
                <Label>Title</Label>
                <InputField
                  type="text"
                  placeholder="Product title"
                  name="title"
                />
                <ErrorMessage
                  name="title"
                  render={(message) => (
                    <FieldErrorMessage>{message}</FieldErrorMessage>
                  )}
                />
              </FormControl>

              <FormControl>
                <Label>Price</Label>
                <InputField
                  type="number"
                  placeholder="Product price"
                  name="price"
                />
                <ErrorMessage
                  name="price"
                  render={(message) => (
                    <FieldErrorMessage>{message}</FieldErrorMessage>
                  )}
                />
              </FormControl>

              <FormControl>
                <Label>Description</Label>
                <InputField
                  as="textarea"
                  cols="25"
                  rows="5"
                  name="description"
                  placeholder="Product description"
                />
                <ErrorMessage
                  name="description"
                  render={(message) => (
                    <FieldErrorMessage>{message}</FieldErrorMessage>
                  )}
                />
              </FormControl>

              <FormControl>
                <Label>Stock</Label>
                <InputField
                  type="number"
                  placeholder="Product stock"
                  name="stock"
                />
                <ErrorMessage
                  name="stock"
                  render={(message) => (
                    <FieldErrorMessage>{message}</FieldErrorMessage>
                  )}
                />
              </FormControl>

              <FormControl>
                <Label>Rating</Label>
                <InputField
                  type="number"
                  placeholder="Product rating"
                  name="rating"
                />
                <ErrorMessage
                  name="rating"
                  render={(message) => (
                    <FieldErrorMessage>{message}</FieldErrorMessage>
                  )}
                />
              </FormControl>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "please wait ..." : "Submit"}
              </Button>
            </FormControlWrapper>
          </Form>
        </Formik>
      </FormWrapper>
    </Backdrop>
  );
};

export default ProductForm;
