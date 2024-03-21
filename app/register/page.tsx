import React from "react";
import RegisterForm from "./components/RegisterForm";
import BoxContainer from "app/components/BoxContainer";

const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen tracking-wider px-10 xs:rounded-[48px] 2xs:px-4">
      <BoxContainer>
        <RegisterForm />
      </BoxContainer>
    </div>
  );
};

export default Page;
