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
      <p className="text-[#ff3333]">{errors[id]?.message?.toString()}</p>
    </div>
  );
};

export default Input;
