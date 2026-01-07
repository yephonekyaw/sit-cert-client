import { CardContent } from "@/components/ui/card";
import { Clock, FileCheck, Archive } from "lucide-react";
import type { GetProgramsItem } from "@/services/staff/programs/types";
import CardBase from "../dashboard/card-base";
import CardHeaderSection from "../dashboard/card-header-section";
import CardInfoSection from "../dashboard/card-info-section";
import CardInfoItem from "../dashboard/card-info-item";
import CardFooter from "../dashboard/card-footer";
import { useNavigate } from "react-router-dom";
import { useProgramStore } from "@/stores/staff/program.stores";

export default function ProgramCard({ program }: { program: GetProgramsItem }) {
  const navigate = useNavigate();
  const { setArchiveConfirmModalState, setArchiveProgramId } =
    useProgramStore();

  const handleEdit = () => {
    navigate(`/staff/programs/edit/${program.id}`);
  };

  const handleArchive = () => {
    setArchiveConfirmModalState(true);
    setArchiveProgramId(program.id);
  };

  return (
    <CardBase>
      <CardHeaderSection
        title={program.programName}
        codes={[program.programCode]}
        isActive={program.isActive}
        onEdit={handleEdit}
        onArchive={handleArchive}
      />

      <CardContent className="pt-0 space-y-4">
        <p className="text-gray-600 leading-relaxed">{program.description}</p>

        <CardInfoSection>
          <CardInfoItem
            icon={Clock}
            label="Duration"
            value={`${program.durationYears}yr${
              program.durationYears !== 1 ? "s" : ""
            }`}
          />
          <CardInfoItem
            icon={FileCheck}
            label="Active Req"
            value={program.activeRequirementsCount}
          />
          <CardInfoItem
            icon={Archive}
            label="Archived Req"
            value={program.archivedRequirementsCount}
          />
        </CardInfoSection>

        <CardFooter
          createdAt={program.createdAt}
          updatedAt={program.updatedAt}
        />
      </CardContent>
    </CardBase>
  );
}
