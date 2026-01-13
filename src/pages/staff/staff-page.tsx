import UpdateMemberModal from "@/components/staff/staff-management/update-member-modal";
import AddMemeberModal from "@/components/staff/staff-management/add-member-modal";
import { columns } from "@/components/staff/staff-management/columns";
import PageHeader from "@/components/staff/staff-management/page-header";
import DataTable from "@/components/ui/data-table/data-table";
import DefaultLoader from "@/components/ui/default-loader";
import { useGetStaffMembers } from "@/services/staff/members/queries";
import { isAxiosError } from "axios";
import { Users } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

const StaffPage = () => {
  const { data: staffMembers, isLoading, error } = useGetStaffMembers();

  useEffect(() => {
    if (error && isAxiosError(error)) {
      toast.error("Failed to load staff members.");
    }
  }, [error]);

  if (isLoading) {
    return <DefaultLoader label="Loading staff members..." />;
  }

  if (error) {
    return (
      <div className="w-full text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="h-8 w-8 text-red-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Failed to load staff members
        </h3>
        <p className="text-gray-600">
          There was an error loading staff members list. Please refresh the page
          to try again.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <PageHeader />
      <DataTable columns={columns} data={staffMembers?.data?.members || []} />
      <AddMemeberModal />
      <UpdateMemberModal />
    </div>
  );
};

export default StaffPage;
