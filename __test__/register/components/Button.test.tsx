import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Button from "../../../app/register/components/Button";

describe("커스텀 버튼 테스트", () => {
  it("인수로 전달 받은 텍스트를 제대로 랜더링해야 한다.", () => {
    const testText = "buttonRenderingTest";
    render(<Button text={testText} />);
    expect(screen.getByRole("button")).toHaveTextContent(testText);
  });

  it("버튼을 hover하면 스타일이 바뀌어야 한다.", async () => {
    render(<Button text="버튼" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("shadow-buttonShadow");

    fireEvent.mouseOver(button);
    await waitFor(() =>
      expect(button).toHaveClass("hover:shadow-hoverButtonShadow")
    );
  });
});
