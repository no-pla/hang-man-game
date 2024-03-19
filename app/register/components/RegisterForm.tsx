"use client";

import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import Input from "./Input";
import { emailRegex, passwordRegex } from "../../../share/utils.js";

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

const RegisterForm = () => {
  const [disabled, setDisabled] = useState(true);
  const method = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      nickname: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterData) => {};

  useEffect(() => {
    setDisabled(!method.formState.isValid);
  }, [method.formState.isValid]);

  return (
    <FormProvider {...method}>
      <form
        onSubmit={method.handleSubmit((data) => onSubmit(data))}
        role="registerForm"
        className="flex flex-col"
      >
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="Enter email"
          validation={{
            required: {
              value: true,
              message: "Required field.",
            },
            pattern: {
              value: emailRegex,
              message: "Incorrect email.",
            },
          }}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Enter password"
          validation={{
            required: {
              value: true,
              message: "Required field.",
            },
            pattern: {
              value: passwordRegex,
              message: "The password must be at least 8 characters long.",
            },
          }}
        />
        <Input
          label="Confirm password"
          id="confirmPassword"
          type="password"
          placeholder="Enter confirm password"
          validation={{
            validate: (value: string) =>
              value === method.watch("password") ||
              "The confirm password does not match.",
            required: {
              value: true,
              message: "Required field.",
            },
          }}
        />
        <Input
          id="nickname"
          label="Nickname"
          type="text"
          placeholder="Enter nickname"
          validation={{
            minLength: {
              value: 2,
              message: "Nickname should be 2-10 characters.",
            },
            maxLength: {
              value: 10,
              message: "Nickname should be 2-10 characters.",
            },
            required: {
              value: true,
              message: "Required field.",
            },
          }}
        />
        <button disabled={disabled}>Register</button>
      </form>
      <Link href="/login">Move to Login Page</Link>
    </FormProvider>
  );
};

export default RegisterForm;
