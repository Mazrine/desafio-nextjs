import { render, screen, fireEvent } from "@testing-library/react";
import { Question } from ".";

describe("Question", function () {
  it("should render", async function () {
    render(
      <Question
        question={{
          id: "id",
          text: "Question text",
          alternatives: [],
        }}
      />
    );

    const textElement = screen.getByText("Question text");
    expect(textElement).toBeInTheDocument();
  });

  it("should have no alternative selected initially", async function () {
    render(
      <Question
        question={{
          id: "id",
          text: "Question text",
          alternatives: [
            { id: "a", text: "Option A" },
            { id: "b", text: "Option B" },
            { id: "c", text: "Option C" },
          ],
        }}
      />
    );

    const radioInputs = screen.getAllByType("radio");
    radioInputs.forEach((radio) => {
      expect(radio).not.toBeChecked();
    });
  });

  it("should call onChange with the selected alternative id", async function () {
    const onChangeMock = jest.fn();
    render(
      <Question
        question={{
          id: "id",
          text: "Question text",
          alternatives: [
            { id: "a", text: "Option A" },
            { id: "b", text: "Option B" },
            { id: "c", text: "Option C" },
          ],
        }}
        onChange={onChangeMock}
      />
    );

    const radioInput = screen.getByValue("a");
    fireEvent.click(radioInput);

    expect(onChangeMock).toHaveBeenCalledWith("a");
  });

  it("should be possible to change the selected alternative with a value prop", async function () {
    const onChangeMock = jest.fn();
    render(
      <Question
        question={{
          id: "id",
          text: "Question text",
          alternatives: [
            { id: "a", text: "Option A" },
            { id: "b", text: "Option B" },
            { id: "c", text: "Option C" },
          ],
        }}
        value="b"
        onChange={onChangeMock}
      />
    );

    const radioInputB = screen.getByValue("b");
    expect(radioInputB).toBeChecked();

    const radioInputC = screen.getByValue("c");
    fireEvent.click(radioInputC);

    expect(onChangeMock).toHaveBeenCalledWith("c");
  });
});

