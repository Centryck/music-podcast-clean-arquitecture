import { render, screen } from "@testing-library/react";
import BadgeComponent, { BadgeComponentProps } from "./";

const setup = (props?: Partial<BadgeComponentProps>) => {
  const utils = render(<BadgeComponent {...props} />);

  const query = {
    badge: () => screen.getByTestId("badge"),
  };

  return {
    ...utils,
    query,
  };
};

describe("BadgeComponent", () => {
  it("should display the correct value in the badge", () => {
    const { query } = setup({ value: "New" });
    expect(query.badge()).toHaveTextContent("New");
  });

  it("should display an empty string when no value is provided", () => {
    const { query } = setup();
    expect(query.badge()).toHaveTextContent("");
  });

  it("should apply the correct className", () => {
    const { query } = setup({ className: "custom-class" });
    expect(query.badge()).toHaveClass("custom-class");
  });
});
