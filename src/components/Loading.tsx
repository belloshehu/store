import React from "react";
import tw from "twin.macro";
const StyledLoading = tw.h2` 
    text-primary
    text-center 
    w-full
  `;

const Loading = ({ message }: { message: string }) => {
  return <StyledLoading>{message}</StyledLoading>;
};

export default Loading;
