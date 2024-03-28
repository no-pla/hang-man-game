import React from "react";
import PropTypes from "prop-types";

interface ButtonData {
  text: string;
  primary?: boolean;
  secondary?: boolean;
}

const Button = ({ text, primary, secondary }: ButtonData) => {
  return (
    <button
      role="button"
      className={`${primary && "bg-blue shadow-buttonShadow hover:shadow-hoverButtonShadow"}  ${secondary && "shadow-secondaryContainerShadow hover:shadow-hoverSecondaryContainerShadow bg-gradient-to-b from-[#FE71FE] to-[#7199FF]"} text-white text-body tracking-wider w-full py-3 rounded-[40px]  cursor-pointer transition-all ease-in-out duration-500`}
    >
      {text}
    </button>
  );
};

export default Button;

Button.PropTypes = {
  text: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
};
