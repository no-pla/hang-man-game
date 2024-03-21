import React from "react";
import { useFormContext } from "react-hook-form";

interface InputData {
  label: string;
  placeholder: string;
  validation: ValidationTypes;
  id: string;
  type: string;
  name?: string;
}

interface ValidationTypes {
  required: {
    value: true;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
  validate?: (value: string) => boolean | string;
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
}

const Input = ({ label, placeholder, validation, id, type }: InputData) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full flex flex-col gap-2 text-bodyM">
      <label htmlFor={id} className="text-white">
        {label}
      </label>
      <input
        {...register(id, validation)}
        type={type}
        id={id}
        className="border px-4 py-2 rounded-xl w-full"
        placeholder={placeholder}
      />
      {errors && errors[id] && (
        <p className="text-warning">{errors[id]?.message?.toString()}</p>
      )}
    </div>
  );
};

export default Input;
