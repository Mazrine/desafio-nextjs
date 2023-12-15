import Link from "next/link";
import { UserAssessment } from "./UserAssessment";

export default async function Assessments() {
  const response = await fetch("http://localhost:3000/api/assessment");
  const assessment = await response.json();

  return (
    <main className="p-6">
      <Link href={"/"} className="text-sm text-blue-600">
        Voltar para Home
      </Link>
      <UserAssessment assessment={assessment} />
    </main>
  );
}
