import React from "react";
import { useFormContext } from "react-hook-form";

interface InputData {
  label: string;
  placeholder: string;
  validation: any;
  id: string;
  type: string;
}

const Input = ({ label, placeholder, validation, id, type }: InputData) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        {...register(label, validation)}
        type={type}
        id={id}
        placeholder={placeholder}
      />
      <p>{errors[label]?.message?.toString()}</p>
    </div>
  );
};

export default Input;
