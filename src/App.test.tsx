import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./router", () => () => <div>Router Component</div>);

describe("App", () => {
  it("should render the Router component", () => {
    render(<App />);

    expect(screen.getByText("Router Component")).toBeInTheDocument();
  });
});
