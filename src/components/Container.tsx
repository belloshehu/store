import React from "react";
import tw from "twin.macro";

const StyledContainer = tw.div` 
    flex 
    flex-col 
    gap-8 
    w-full 
    min-h-screen
    p-2 
    md:py-10
    md:px-28 
    bg-slate-300
`;

const Container = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
