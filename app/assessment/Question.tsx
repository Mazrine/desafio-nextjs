import clsx from "clsx";
import { ChangeEvent } from "react";
import { QuestionDTO } from "./types";

type QuestionProps = {
  className?: string;
  question: QuestionDTO;
  value?: string | null;
  name?: string;
  onChange?: (value: string) => void;
};
export function Question({
  name,
  value,
  onChange,
  question,
  className,
}: QuestionProps) {
  function handleAlternativeSelection(event: ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      onChange(event.target.value);
    }
  }

  return (
    <div className={clsx(className)}>
      <div>{question.text}</div>
      {question.alternatives.map((alternative) => {
        return (
          <div key={alternative.id}>
            <input
              type="radio"
              name={name}  
              value={alternative.id}
              id={alternative.id}
              checked={value === alternative.id}
              onChange={handleAlternativeSelection}
            />
            <label htmlFor={alternative.id}>{alternative.text}</label>
          </div>
        );
      })}
    </div>
  );
}
