"use client"; // agora vai!

import clsx from "clsx";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Assessment, AssessmentDTO, UserAssessmentDTO } from ".";

type UserAssessmentProps = {
  className?: string;
  assessment: AssessmentDTO;
};
export function UserAssessment({ className, assessment }: UserAssessmentProps) {
  const form = useForm<UserAssessmentDTO>();
  const { register, handleSubmit } = form;

  const [userNameConfirmed, setUserNameConfirmed] = useState(false);
  function confirmUserName() {
    setUserNameConfirmed(true);
  }

  useEffect(() => {
    setTimeout(function () {
      alert("assessment finalizado");
    }, assessment.durationInSeconds * 1000);
  }, [assessment.durationInSeconds]);

  function submitAssessment(formData: UserAssessmentDTO) {
    alert(JSON.stringify(formData, null, 2));
  }

  return (
    <FormProvider {...form}>
      <h2 className="text-lg">{assessment.title}</h2>
      <p className="text-xs">{assessment.description}</p>
      <form
        className={clsx(className)}
        onSubmit={handleSubmit(submitAssessment)}
      >
        <input
          type="text"
          {...register("userName")}
          placeholder="Nome"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              confirmUserName();
            }
          }}
        />
        <button
          onClick={confirmUserName}
          type="button"
          className={clsx("bg-blue-600 p-1 inline-block text-gray-50", {
            hidden: userNameConfirmed,
          })}
        >
          Confirmar
        </button>
        {userNameConfirmed ? (
          <>
            <Assessment assessment={assessment} />
            <button
              type="submit"
              className="bg-blue-600 p-1 inline-block text-gray-50"
            >
              Finalizar
            </button>
          </>
        ) : (
          <div>Insira seu nome para iniciar o assessment.</div>
        )}
      </form>
    </FormProvider>
  );
}
