import React from "react";
import tw from "twin.macro";
import { LiaTimesSolid } from "react-icons/lia";
import { ModalProps, ModalType } from "../types";
import { Backdrop } from "./BackDrop";

const StyledModal = tw.div`  
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
`;

const ModalText = tw.p`  
    text-center 
    text-primary
`;

const CloseTimes = tw(LiaTimesSolid)` 
    text-red-500 
    font-bold 
    text-2xl 
    md:text-4xl
    absolute 
    top-5 
    right-5
`;

const Modal = ({ message, setModal }: ModalProps) => {
  return (
    <Backdrop>
      <StyledModal>
        <CloseTimes
          onClick={() => {
            setModal({ message: "", show: false });
          }}
        />
        <ModalText>{message}</ModalText>
      </StyledModal>
    </Backdrop>
  );
};

export default Modal;
