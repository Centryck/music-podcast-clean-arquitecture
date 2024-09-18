import Router from "./";
import { render, screen } from "@testing-library/react";

const renderElement = ({ route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  const utils = render(<Router />);

  const query = {
    homePage: () => screen.queryByTestId("home-page"),

    wrongPage: () => screen.queryByText("404"),
  };

  return {
    ...utils,
    query,
  };
};

describe("Router", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should render Home as default page", () => {
    const { query } = renderElement();

    expect(query.homePage()).not.toBeNull();
  });

  it("should render a 404 if route is wrong", () => {
    const route = "/qweqwr/1";

    const { query } = renderElement({ route });

    expect(query.wrongPage()).not.toBeNull();
  });
});
