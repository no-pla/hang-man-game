import React from "react";
import RegisterForm from "./components/RegisterForm";
import Container from "app/components/Container";

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen tracking-wider px-10 2sm:rounded-[48px] 3sm:px-4">
      <Container>
        <RegisterForm />
      </Container>
    </div>
  );
};

export default page;
