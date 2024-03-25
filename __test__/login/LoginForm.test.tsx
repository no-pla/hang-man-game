import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import LoginForm from "../../app/login/LoginForm";
import AppRouterContextProviderMock from "../../provider/app-router-context-provider-mock";

describe("로그인 페이지", () => {
  const push = jest.fn();
  describe("마크업 테스트", () => {
    beforeEach(() => {
      render(
        <AppRouterContextProviderMock router={{ push }}>
          <LoginForm />
        </AppRouterContextProviderMock>
      );
    });
    it("로그인에 필요한 모든 input이 랜더링 되었는지 확인한다.", () => {
      const inputs = screen.getAllByRole("textbox");
      const passwordInputs = screen.getByPlaceholderText("Enter password");

      expect(inputs).toHaveLength(1);
      expect(passwordInputs).toBeInTheDocument(); // textbox로 password input을 가져올 수 없다.
    });

    it("회원가입 페이지로 이동하는 링크와 플로우가 제대로 작동하는지 확인한다.", () => {
      const registerLink = screen.getByRole("link", {
        name: /Register/i,
      });
      expect(registerLink).toBeInTheDocument();
      expect(registerLink).toHaveAttribute("href", "/register");
    });
  });

  describe("유효성 검사 테스트", () => {
    it("이메일 정규식을 통과하지 못하면 경고 문구가 떠야 한다.", async () => {
      const { container, getByLabelText } = render(
        <AppRouterContextProviderMock router={{ push }}>
          <LoginForm />
        </AppRouterContextProviderMock>
      );
      const emailInput = getByLabelText("Email");

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: "invalidEmail" } });
      });

      expect(container.innerHTML).toMatch("Incorrect email.");

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
      });

      expect(container.innerHTML).not.toMatch("Incorrect email.");
    });

    it("비밀번호 정규식을 통과하지 못하면 경고 문구가 떠야 한다.", async () => {
      const { container, getByLabelText } = render(
        <AppRouterContextProviderMock router={{ push }}>
          <LoginForm />
        </AppRouterContextProviderMock>
      );
      const emailInput = getByLabelText("Password");

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: "invalidPw" } });
      });
      expect(container.innerHTML).toMatch(
        "Password must be at least 8 characters with letters and numbers."
      );

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: "validPw1" } });
      });
      expect(container.innerHTML).not.toMatch(
        "Password must be at least 8 characters with letters and numbers."
      );
    });
  });
});
