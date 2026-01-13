import { Button } from "@/components/ui/button";
import { useMemberStore } from "@/stores/staff/member.stores";
import { UserLock, UserPlus } from "lucide-react";

const PageHeader = () => {
  const { setCreateModalState } = useMemberStore();
  return (
    <header className="rounded-2xl mb-[1rem]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <UserLock className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-900">
              Staff Management
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Create and manage staff accounts.
            </p>
          </div>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => {
            setCreateModalState(true);
          }}
        >
          <UserPlus className="h-4 w-4 mr-1" />
          Add Member
        </Button>
      </div>
    </header>
  );
};

export default PageHeader;
