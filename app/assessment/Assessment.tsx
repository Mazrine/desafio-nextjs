"use client";
import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";
import { Question } from ".";
import { AssessmentDTO, UserAssessmentDTO } from "./types";

type AssessmentProps = {
  className?: string;
  assessment: AssessmentDTO;
};
export function Assessment({ assessment, className }: AssessmentProps) {
  const { control } = useFormContext<UserAssessmentDTO>();

  return (
    <div className={clsx(className)}>
      {assessment.questions.map((question, index) => {
        return (
          <Controller
            key={question.id}
            control={control}
            name={`answers.${index}`}
            render={({ field: { ref, ...field } }) => (
              <Question {...field} question={question} />
            )}          />
        );
      })}
    </div>
  );
}
