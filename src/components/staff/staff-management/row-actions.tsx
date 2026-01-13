import { Edit } from "lucide-react";
import type { Row } from "@tanstack/react-table";
import type { StaffDataItem } from "@/types/staff/member.types";
import { useMemberStore } from "@/stores/staff/member.stores";

const RowActions = ({ row }: { row: Row<StaffDataItem> }) => {
  const { setSelectedMember, setUpdateModalState } = useMemberStore();
  return (
    <div className="flex gap-2">
      <div
        className="p-2 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors cursor-pointer"
        title="Edit"
        onClick={() => {
          setSelectedMember(row.original);
          setUpdateModalState(true);
        }}
      >
        <Edit className="h-4 w-4 text-orange-600" />
      </div>
    </div>
  );
};

export default RowActions;
