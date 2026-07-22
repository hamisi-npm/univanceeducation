import {
  ProgramCareer,
  ProgramDetailCta,
  ProgramDetailHero,
  ProgramFees,
  ProgramOverview,
  ProgramRequirements,
  ProgramScholarships,
  ProgramUniversityInfo,
  QuickFacts,
  RelatedPrograms,
} from "@/features/programs/components/program-detail-sections";
import type { ProgramCard, ProgramDetail } from "@/types/programs";

type ProgramDetailViewProps = {
  program: ProgramDetail;
  related: ProgramCard[];
};

export function ProgramDetailView({ program, related }: ProgramDetailViewProps) {
  return (
    <>
      <ProgramDetailHero program={program} />
      <QuickFacts facts={program.quickFacts} program={program} />
      <ProgramOverview program={program} />
      <ProgramRequirements program={program} />
      <ProgramFees program={program} />
      <ProgramScholarships program={program} />
      <ProgramCareer program={program} />
      <ProgramUniversityInfo program={program} />
      <RelatedPrograms programs={related} />
      <ProgramDetailCta program={program} />
    </>
  );
}
