import React from "react";
import { render, screen } from "@testing-library/react";
import Input from "../../../app/register/components/Input";
import { FormProvider, useForm } from "react-hook-form";

describe("Authentication input 테스트", () => {
  it("input이 제대로 랜더링되는지 확인한다.", () => {
    const TestInput = () => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <Input
            label="email"
            placeholder="Enter email"
            id="email"
            validation={{
              required: {
                value: true,
                message: "Required field",
              },
            }}
            type="email"
          />
        </FormProvider>
      );
    };
    render(<TestInput />);

    expect(screen.getByLabelText("email")).toBeInTheDocument();
  });
});
