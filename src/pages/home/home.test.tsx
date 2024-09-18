import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./";
import { useGetAllPodcasts } from "../../application/podcast/use-get-all-podcasts";
import { Podcast } from "../../domain/entity/podcast/podcast";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../application/podcast/use-get-all-podcasts");

const mockPodcasts: Podcast[] = [
  {
    id: "1",
    name: "React Podcast",
    artist: "podcastTest",
    image: [
      { label: "", attributes: { height: "12" } },
      { label: "", attributes: { height: "12" } },
      { label: "https://image2.com", attributes: { height: "12" } },
    ],
    title: "React Podcast",
    summary: "summary",
    rights: "all",
  },
  {
    id: "2",
    name: "Typescript Podcast",
    artist: "podcastTest",
    image: [
      { label: "", attributes: { height: "12" } },
      { label: "", attributes: { height: "12" } },
      { label: "https://image3.com", attributes: { height: "12" } },
    ],
    title: "Typescript Podcast",
    summary: "summary",
    rights: "all",
  },
];

const renderElement = () => {
  const utils = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  const query = {
    // Components
    homePage: () => screen.queryByTestId("home-page"),
    header: () => screen.queryByTestId("badge"),
    filterInput: () => screen.queryByPlaceholderText("Filter podcasts..."),
    podcastItems: () => screen.queryAllByTestId("podcast-item"),

    // Podcast list
    podcastByName: (name: string) => screen.queryByText(name),
  };

  return {
    ...utils,
    query,
  };
};

describe("Home Component", () => {
  beforeEach(() => {
    (useGetAllPodcasts as jest.Mock).mockReturnValue({
      podcasts: mockPodcasts,
      isLoading: false,
    });
  });

  it("should render correctly", () => {
    const { query } = renderElement();

    expect(query.homePage()).not.toBeNull();
    expect(query.filterInput()).not.toBeNull();
    expect(query.podcastItems().length).toBe(2);
  });

  it("should display loading state", () => {
    (useGetAllPodcasts as jest.Mock).mockReturnValueOnce({
      podcasts: [],
      isLoading: true,
    });

    const { query } = renderElement();

    expect(query.header()).toBeInTheDocument();
  });

  it("should filter podcasts based on the search text", async () => {
    const { query } = renderElement();

    fireEvent.change(query.filterInput()!, { target: { value: "React" } });

    await waitFor(() => {
      expect(query.podcastByName("REACT PODCAST")).not.toBeNull();
    });
    expect(query.podcastByName("TYPESCRIPT PODCAST")).toBeNull();
  });

  it("should handle special characters in filter text", async () => {
    const { query } = renderElement();

    // Filter by name with special characters
    fireEvent.change(query.filterInput()!, { target: { value: "Rea*ct" } });

    await waitFor(() => {
      expect(query.podcastByName("REACT PODCAST")).toBeNull();
    });
    expect(query.podcastByName("TYPESCRIPT PODCAST")).toBeNull();
  });

  it("should reset the filter and display all podcasts", async () => {
    const { query } = renderElement();

    fireEvent.change(query.filterInput()!, { target: { value: "React" } });

    await waitFor(() => {
      expect(query.podcastByName("REACT PODCAST")).not.toBeNull();
    });
    expect(query.podcastByName("TYPESCRIPT PODCAST")).toBeNull();

    fireEvent.change(query.filterInput()!, { target: { value: "" } });

    await waitFor(() => {
      expect(query.podcastByName("REACT PODCAST")).not.toBeNull();
    });
    expect(query.podcastByName("TYPESCRIPT PODCAST")).not.toBeNull();
  });
});
