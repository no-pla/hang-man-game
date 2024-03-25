import BoxContainer from "app/components/BoxContainer";
import React from "react";
import LoginForm from "./LoginForm";

const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen tracking-wider px-10 xs:rounded-[48px] 2xs:px-4">
      <BoxContainer>
        <LoginForm />
      </BoxContainer>
    </div>
  );
};

export default Page;
