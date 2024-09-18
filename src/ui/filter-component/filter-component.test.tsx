import { render, fireEvent, screen } from "@testing-library/react";
import FilterComponent, { FilterComponentProps } from "./";

const ON_CHANGE = jest.fn();

const setup = (props?: Partial<FilterComponentProps>) => {
  const utils = render(<FilterComponent onChange={ON_CHANGE} {...props} />);

  const query = {
    input: () => screen.getByPlaceholderText("Filter podcasts..."),
    badge: () => screen.getByText(props?.podcastNumber ?? "0"),
  };

  return {
    ...utils,
    query,
  };
};

describe("FilterComponent", () => {
  it("should display the correct number of podcasts in the badge", () => {
    const { query } = setup({ podcastNumber: "10" });
    expect(query.badge()).toHaveTextContent("10");
  });

  it("should display 0 podcasts in the badge when the podcastNumber is not provided", () => {
    const { query } = setup();
    expect(query.badge()).toHaveTextContent("0");
  });

  it("should call the onChange prop when the input value changes", () => {
    const onChange = jest.fn();
    const { query } = setup({ onChange });

    fireEvent.change(query.input(), { target: { value: "react" } });

    expect(onChange).toHaveBeenCalledWith("react");
  });
});
