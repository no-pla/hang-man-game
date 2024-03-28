import React from "react";

interface ButtonData {
  text: string;
  primary: boolean;
}

const Button = ({ text, primary }: ButtonData) => {
  return (
    <button
      role="button"
      className={`${!primary ? "bg-blue shadow-buttonShadow hover:shadow-hoverButtonShadow" : "shadow-secondaryContainerShadow hover:shadow-hoverSecondaryContainerShadow bg-gradient-to-b from-[#FE71FE] to-[#7199FF]"} text-white text-body tracking-wider w-full py-3 rounded-[40px]  cursor-pointer transition-all ease-in-out duration-500`}
    >
      {text}
    </button>
  );
};

export default Button;
