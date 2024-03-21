import React from "react";

interface ButtonData {
  text: string;
  disabled: boolean;
}

const Button = ({ text, disabled = false }: ButtonData) => {
  return (
    <button
      disabled={disabled}
      className={`bg-blue text-white text-body tracking-wider w-full py-3 rounded-[40px] shadow-buttonShadow cursor-pointer hover:shadow-hoverButtonShadow transition-all ease-in-out duration-500`}
    >
      {text}
    </button>
  );
};

export default Button;
