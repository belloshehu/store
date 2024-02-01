import tw from "twin.macro";
import { ImageProp } from "../types";

const StyledImage = tw.img`
h-[50px] w-[80px]
md:h-[100px] md:w-[200px]
rounded-md 
object-cover
aspect-square
`;

export const Image = ({ url, alt }: ImageProp) => {
  return <StyledImage src={url} alt={alt} />;
};
