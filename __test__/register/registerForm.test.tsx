import { fireEvent, render, screen } from "@testing-library/react";
import RegisterForm from "../../app/register/components/RegisterForm";
import { act } from "react-dom/test-utils";

describe("회원가입 페이지", () => {
  const placeholderCases = [
    ["email", /email/i],
    ["password", "Enter password"],
    ["confirm password", /confirm password/i],
    ["nickname", /nickname/i],
  ];

  describe("마크업 테스트", () => {
    it("회원가입 필드가 모두 제대로 랜더링되었는지 확인한다.", () => {
      render(<RegisterForm />);

      const inputs = screen.getAllByRole("textbox");
      const passwordInputs = screen.getByText("Password");
      const confirmPasswordInputs = screen.getByText("Confirm password");

      expect(inputs).toHaveLength(2);
      expect(passwordInputs).toBeInTheDocument(); // textbox로 password input을 가져올 수 없다.
      expect(confirmPasswordInputs).toBeInTheDocument();
    });

    it.each(placeholderCases)(
      "회원가입 필드의 %p input이 옳은 placeholder를 가지고 있는지 확인한다.",
      (_, placeholder) => {
        render(<RegisterForm />);

        const placeholderInput = screen.getByPlaceholderText(placeholder);
        expect(placeholderInput).toBeInTheDocument();
      }
    );

    it("로그인 페이지로 이동하는 링크와 플로우가 작성되었는지 확인한다.", () => {
      render(<RegisterForm />);
      const loginLink = screen.getByRole("link", {
        name: /login/i,
      });
      expect(loginLink).toBeInTheDocument();
      fireEvent.click(loginLink);
      expect(loginLink).toHaveAttribute("href", "/login");
    });

    it("회원가입 버튼은 기본적으로 비활성화 상태여야 한다.", () => {
      render(<RegisterForm />);

      const registerButton = screen.getByRole("button", {
        name: /Register/i,
      });

      expect(registerButton).toBeDisabled();
    });
  });

  describe("유효성 검사 테스트", () => {
    const inputArray = [
      ["email", "Email"],
      ["password", "Password"],
      ["Confirm Password", "Confirm password"],
      ["Nickname", "Nickname"],
    ];
    describe("input이 비어 있으면, 버튼이 비활성화되어야 한다.", () => {
      it.each(inputArray)(
        "%p의 input 란이 비어 있으면, 버튼이 비활성화되어야 한다.",
        (_, label) => {
          render(<RegisterForm />);
          const input = screen.getByLabelText(label, {
            selector: "input",
          });
          const registerButton = screen.getByRole("button", {
            name: /register/i,
          });

          fireEvent.change(input, { target: { value: "" } });
          expect(registerButton).toBeDisabled();
        }
      );
    });

    describe("validation을 통과하지 못했을 떄", () => {
      it("이메일 정규식을 통과하지 못하면, 버튼이 비활성화되고 경고 문구가 떠야 한다.", async () => {
        const { container, getByLabelText } = render(<RegisterForm />);
        const emailInput = getByLabelText("Email");
        expect(emailInput).toBeInTheDocument();
        expect(container.innerHTML).not.toMatch("Incorrect email.");

        await act(async () => {
          fireEvent.change(emailInput, { target: { value: "invalid" } });
          fireEvent.blur(emailInput);
        });

        expect(container.innerHTML).toMatch("Incorrect email.");
      });
      it("비밀번호가 8자 이하면, 버튼이 비활성화되고 경고 문구가 떠야 한다.", async () => {
        const { container, getByLabelText } = render(<RegisterForm />);
        const emailInput = getByLabelText("Password");
        expect(emailInput).toBeInTheDocument();
        expect(container.innerHTML).not.toMatch(
          "The password must be at least 8 characters long."
        );

        await act(async () => {
          fireEvent.change(emailInput, { target: { value: "invalid" } });
          fireEvent.blur(emailInput);
        });

        expect(container.innerHTML).toMatch(
          "The password must be at least 8 characters long."
        );
      });
      it("비밀번호와 비밀번호 확인의 값이 일치하지 않으면 버튼이 비활성화되고 경고 문구가 떠야 한다.", async () => {
        const { container, getByLabelText } = render(<RegisterForm />);
        const input = getByLabelText("Password");
        const confirmInput = getByLabelText("Confirm password");
        expect(input).toBeInTheDocument();
        expect(confirmInput).toBeInTheDocument();
        expect(container.innerHTML).not.toMatch(
          "The confirm password does not match."
        );

        await act(async () => {
          fireEvent.change(input, { target: { value: "validPassword" } });
          fireEvent.blur(input);
          fireEvent.change(confirmInput, {
            target: { value: "passwordDoesNotMatch" },
          });
          fireEvent.blur(confirmInput);
        });

        expect(container.innerHTML).toMatch(
          "The confirm password does not match."
        );
      });
      it("닉네임이 2자에서 10자리의 값이 아니면 버튼이 비활성화되고 경고 문구가 떠야 한다.", async () => {
        const { container, getByLabelText } = render(<RegisterForm />);
        const nicknameInput = getByLabelText("Nickname");
        expect(nicknameInput).toBeInTheDocument();
        expect(container.innerHTML).not.toMatch(
          "Nickname should be 2-10 characters."
        );

        await act(async () => {
          fireEvent.change(nicknameInput, { target: { value: "n" } });
          fireEvent.blur(nicknameInput);
        });

        expect(container.innerHTML).toMatch(
          "Nickname should be 2-10 characters."
        );

        await act(async () => {
          fireEvent.change(nicknameInput, {
            target: { value: "tooLongLongNickName" },
          });
          fireEvent.blur(nicknameInput);
        });

        expect(container.innerHTML).toMatch(
          "Nickname should be 2-10 characters."
        );

        await act(async () => {
          fireEvent.change(nicknameInput, {
            target: { value: "validNick" },
          });
          fireEvent.blur(nicknameInput);
        });

        expect(container.innerHTML).not.toMatch(
          "Nickname should be 2-10 characters."
        );
      });
    });
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
// });
