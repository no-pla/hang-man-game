import { fireEvent, render, screen } from "@testing-library/react";
import RegisterForm from "../../app/register/components/RegisterForm";

describe("회원가입 페이지", () => {
  const placeholderCases = [
    ["email", /email/i],
    ["password", /password/i],
    ["confirm Password", /confirm password/i],
    ["nickname", /nickname/i],
  ];
  describe("마크업 테스트", () => {
    it("회원가입 필드가 모두 제대로 랜더링되었는지 확인한다.", () => {
      render(<RegisterForm />);

      const inputs = screen.getAllByRole("textbox");

      expect(inputs).toHaveLength(4);
    });

    it.each(placeholderCases)(
      "회원가입 필드의 %p input이 옳은 placeholder를 가지고 있는지 확인한다.",
      (_, placeholder) => {
        const placeholderInput = screen.getByPlaceholderText(placeholder);
        expect(placeholderInput).toBeInTheDocument();
      }
    );

    it("로그인 페이지로 이동하는 링크와 플로우가 작성되었는지 확인한다.", () => {
      render(<RegisterForm />);
      const loginLink = screen.getByRole("a", {
        name: /login/i,
      });
      expect(loginLink).toBeInTheDocument();
      fireEvent.click(loginLink);
      expect(window.location.assign).toHaveBeenCalledWith("/login");
    });

    it("회원가입 버튼은 기본적으로 비활성화 상태여야 한다.", () => {
      render(<RegisterForm />);

      const registerButton = screen.getByRole("button", {
        name: /register/i,
      });

      expect(registerButton).toBeDisabled();
    });
  });

  describe("유효성 검사 테스트", () => {
    it("이메일 란이 비어 있으면, 버튼이 비활성화되어야 한다.", () => {
      render(<RegisterForm />);

      const emailInputs = screen.getByRole("textbox", {
        name: /email/i,
      });
      const registerButton = screen.getByRole("button", {
        name: /register/i,
      });

      // 이메일이 비어 있으면 비활성화 된다.
      fireEvent.change(emailInputs, { target: { value: "" } });
      expect(registerButton).toBeDisabled();
    });
    it("비밀번호 란이 비어 있으면, 버튼이 비활성화되어야 한다.", () => {
      const emailInputs = screen.getAllByRole("textbox", {
        name: /email/i,
      });
      const registerButton = screen.getAllByRole("button", {
        name: /register/i,
      });
      expect(emailInputs).toBe("");
      expect(registerButton).toBeDisabled();
    });

    it("이메일 정규식을 통과하지 못하면, 버튼이 비활성화되고 경고 문구가 떠야 한다.", () => {
      const emailInput = screen.getByLabelText(/email/i);
      const registerButton = screen.getByRole("button", { name: /register/i });
      const errorMessage = screen.getByRole("paragraph", {
        name: /error/i,
      });
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      // 기본적으로 에러 메시지가 뜨지 않는다.
      expect(errorMessage).not.toBeInTheDocument();

      // 잘못된 형식의 이메일을 입력하면 메시지가 뜬다.
      fireEvent.change(emailInput, { target: { value: "userExampleCom" } });
      expect("emailInput").not.toMatch(emailRegex);
      expect(errorMessage).toBeInTheDocument();
      expect(registerButton).toBeDisabled();

      // 옳은 형식의 이메일을 입력하면 메시지가 사라진다.
      fireEvent.change(emailInput, { target: { value: "user@example.com" } });
      expect("user@example.com").not.toMatch(emailRegex);
      expect(errorMessage).not.toBeInTheDocument();
    });
    it("비밀번호가 8자 이하면, 버튼이 비활성화되고 경고 문구가 떠야 한다.", () => {
      const passwordInput = screen.getByRole("textbox", {
        name: /password]/i,
      });
      const registerButton = screen.getByRole("button", { name: /register/i });
      const passwordRegex =
        /^(?=.*[a-zA-Z0-9!@#$%^&*()-_+=])[a-zA-Z0-9!@#$%^&*()-_+=]{8,}$/;
      const errorMessage = screen.getByRole("paragraph", {
        name: /error/i,
      });

      // 기본적으로 버튼이 비활성화 된다.
      expect(registerButton).toBeDisabled();
      // 경고 문구가 보이지 않아야 한다.
      expect(errorMessage).not.toBeInTheDocument();

      // 8자 이하의 비밀번호를 입력한 상태면 비활성화 된다.
      fireEvent.change(passwordInput, { target: { value: "wrongPw" } });
      expect("wrongPw").not.toMatch(passwordRegex);
      expect(errorMessage).toBeInTheDocument();

      // 8자 이상의 비밀번호를 입력하면 정규식을 통과한다. 에러 문구가 보이지 않아야 한다.
      fireEvent.change(passwordInput, { target: { value: "correctPassword" } });
      expect("correctPassword").toMatch(passwordRegex);
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  // TODO: 추후에 작성해 보기
  // describe("에러 테스트", () => {
  //   it("에러가 발생하면 모달이 뜬다.", () => {});
  //   it("이미 가입된 유저면 에러가 발생한다.", () => {});
  //   it("이메일이나 비밀번호를 전달하지 않으면 에러가 발생한다.", () => {});
  // });
  // describe("로직 테스트", () => {
  //   it("회원가입이 완료되면 로그인 페이지로 이동한다.", () => {});
  // });
  // describe("접근성 테스트", () => {
  //   it("모든 요소가 키보드로 접근 가능한지 확인한다.", () => {});
  // });
});
