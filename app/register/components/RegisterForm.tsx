"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import Input from "./Input";
import Button from "./Button";
import { emailPattern, passwordPattern } from "../../../share/utils.js";
import { useRouter } from "next/navigation";

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const method = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      nickname: "",
    },
    mode: "all",
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      const res = await fetch("api/user", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error(error);
      return;
    }
    router.push("/login");
  };

  return (
    <>
      <h2 className="text-headingS mb-5 text-white">Register</h2>
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
            name="new-password"
            id="password"
            type="password"
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
          <Button text="Register" />
        </form>
      </FormProvider>
      <div className="text-body mt-5 text-center">
        <Link href="/login" className="text-white text-bodyM">
          Move to Login Page
        </Link>
      </div>
    </>
  );
};

export default RegisterForm;
