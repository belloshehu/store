import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types";
import axios from "axios";
import tw from "twin.macro";
import styled from "twin.macro";
import { FaStar } from "react-icons/fa";
import Loading from "../components/Loading";

const url = "https://dummyjson.com/products/";
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const Wrapper = tw.div`
    flex 
    flex-col 
    gap-10 
    items-start

    p-2 md:p-10
    w-full
    min-h-screen
  `;

  const ImageThumbnailWrapper = tw.div`
    flex 
    flex-col
    gap-4
    w-full
    
  `;
  const ThumbnailWrapper = tw.div`
    flex
    items-center
    gap-2 
    justify-start
    w-full
  `;
  const Thumbnail = tw.img` 
    w-[100px]
    h-[50px]
    border-2
    border-primary
    object-cover
    hover:[scale:102%]
   `;

  const Details = tw.div` 
    flex 
    flex-col
    md:w-1/2
    gap-3

  `;

  const ImageDetailWrapper = tw.div` 
    flex 
    flex-col 
    w-full
    md:flex-row 
    gap-5
    md:gap-10  
  `;

  const Image = tw.img`  
    w-full
    h-[400px]
    object-cover
    aspect-square
    border-2
    border-primary
  `;

  const Title = tw.h1` 
    text-xl 
    md:text-3xl
    font-bold
    text-primary
    p-2 
    bg-slate-100
    capitalize
  `;

  const Description = tw.p` 
    text-center
  `;

  const DescriptionWrapper = tw.div` 
    flex 
    flex-col 
    gap-2
  `;
  const DescriptionHeading = tw.h3` 
    text-xl 
    font-bold
  `;

  const Price = tw.h3` 
    text-2xl
    md:text-5xl 
    font-bold
  `;
  const Discount = tw.small` 
    inline 
  `;
  const PriceWrapper = tw.div` 
    flex 
    gap-2
    items-center
    text-red-500 
  `;

  const Rating = tw.h2` 
    text-2xl
    md:text-7xl 
    font-bold 
  `;
  const RatingWrapper = tw.div` 
    flex 
    items-center
    justify-start
    gap-2 
    text-slate-500
  `;

  const Star = tw(FaStar)`
    text-xl 
    font-bold
  `;

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await axios.get(url + `${id}`);
        setProduct(res.data);
        console.log(res.data);
      } catch (error: any) {
        setErrorMsg(`Error in fetching product with ID ${id}`);
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (loading) return <Loading message="Loading ... " />;
  return (
    <Wrapper>
      <ImageDetailWrapper>
        <ImageThumbnailWrapper>
          <Image src={product?.images[0]} />
          <ThumbnailWrapper>
            {product?.images.map((image) => (
              <Thumbnail src={image} alt={product.title} />
            ))}
          </ThumbnailWrapper>
        </ImageThumbnailWrapper>
        <Details>
          <Title>{product?.title}</Title>
          <PriceWrapper>
            <Price>${product?.price}</Price>
            <Discount>{product?.discountPercentage}% off</Discount>
          </PriceWrapper>
          <p>{product?.stock} in stock</p>
          <RatingWrapper>
            <Rating>{product?.rating}</Rating>
            <Star />
          </RatingWrapper>
        </Details>
      </ImageDetailWrapper>
      <DescriptionWrapper>
        <DescriptionHeading>Description</DescriptionHeading>
        <Description>{product?.description}</Description>
      </DescriptionWrapper>
    </Wrapper>
  );
};

export default ProductDetail;
