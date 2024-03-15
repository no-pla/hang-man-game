import { render, screen } from "@testing-library/react";
import Page from "../app/page";

test("테스팅 테스트", () => {
  render(<Page />);
  const mainElement = screen.getByRole("main");
  expect(mainElement).toHaveTextContent(/Home/i);
});
