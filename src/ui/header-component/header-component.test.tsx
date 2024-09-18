import { render, screen } from "@testing-library/react";
import Header, { HeaderProps } from "./";
import { BrowserRouter as Router } from "react-router-dom";

const renderElement = (props?: HeaderProps) => {
  const utils = render(
    <Router>
      <Header isLoading={true} {...props} />
    </Router>
  );

  const query = {
    title: () => screen.queryByText("Podcaster"),
    badge: () => screen.queryByTestId("badge"),
  };

  return {
    ...utils,
    query,
  };
};

describe("Header", () => {
  it("should render the title as a link to '/'", () => {
    const { query } = renderElement();

    expect(query.title()).not.toBeNull();
    expect(query.title()).toHaveAttribute("href", "/");
  });

  it("should render the loading badge if isLoading is true", () => {
    const { query } = renderElement();

    expect(query.badge()).not.toBeNull();
  });

  it("should not render the loading badge if isLoading is false", () => {
    const { query } = renderElement({ isLoading: false });

    expect(query.badge()).toBeNull();
  });
});
