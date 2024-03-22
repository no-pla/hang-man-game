"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import Input from "../register/components/Input";
import Button from "../register/components/Button";
import { emailPattern, passwordPattern } from "../../share/utils";

interface LoginData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const method = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  const onSubmit = (data: LoginData) => {
    console.log(data);
  };

  return (
    <>
      <h2 className="text-headingS mb-5 text-white">Login</h2>
      <FormProvider {...method}>
        <form
          onSubmit={method.handleSubmit((data) => onSubmit(data))}
          role="registerForm"
          className="flex flex-col gap-2 items-center w-full"
        >
          <Input
            label="Email"
            type="email"
            id="email"
            name="user-email"
            placeholder="Enter email"
            validation={{
              required: {
                value: true,
                message: "Required field.",
              },
              pattern: {
                value: emailPattern,
                message: "Incorrect email.",
              },
            }}
          />
          <Input
            label="Password"
            type="password"
            id="password"
            name="user-password"
            placeholder="Enter password"
            validation={{
              required: {
                value: true,
                message: "Required field.",
              },
              pattern: {
                value: passwordPattern,
                message:
                  "Password must be at least 8 characters with letters and numbers.",
              },
            }}
          />
          <div className="w-full mt-5">
            <Button text="Login" />
          </div>
        </form>
      </FormProvider>
      <div className="text-body mt-5 text-center">
        <Link href="/register" className="text-white text-bodyM">
          Move to Register Page
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
