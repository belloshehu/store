import React from "react";
import tw from "twin.macro";

const StyledBackdrop = tw.div` 
    backdrop-blur-sm
    backdrop-brightness-50  
    w-full
    h-screen
    fixed 
    top-0
    left-0
    flex 
    justify-center 
    items-center
    overflow-y-auto
`;

export const BackDrop = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <StyledBackdrop>{children}</StyledBackdrop>;
};
