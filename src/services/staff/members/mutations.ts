import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStaffMember, updateStaffMember } from "./apis";
import type { ApiError, ApiResponse } from "@/services/api/types";
import type {
  StaffDataItem,
  CreateMemberFormSchemaType,
  UpdateMemberFormSchemaType,
} from "@/types/staff/member.types";
import { toast } from "sonner";
import { useMemberStore } from "@/stores/staff/member.stores";

export const useCreateStaffMember = () => {
  const queryClient = useQueryClient();
  const { setCreateModalState } = useMemberStore();

  return useMutation<
    ApiResponse<StaffDataItem>,
    ApiError,
    CreateMemberFormSchemaType
  >({
    mutationFn: createStaffMember,
    onSuccess: () => {
      toast.success("Staff member added successfully");
      queryClient.invalidateQueries({ queryKey: ["staff", "members"] });
      setCreateModalState(false);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to add staff member"
      );
    },
  });
};

export const useUpdateStaffMember = () => {
  const queryClient = useQueryClient();
  const { setSelectedMember, setUpdateModalState } = useMemberStore();

  return useMutation<
    ApiResponse<StaffDataItem>,
    ApiError,
    UpdateMemberFormSchemaType & { id: string }
  >({
    mutationFn: updateStaffMember,
    onSuccess: () => {
      toast.success("Staff member updated successfully");
      queryClient.invalidateQueries({ queryKey: ["staff", "members"] });
      setUpdateModalState(false);
      setSelectedMember(null);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update staff member"
      );
    },
  });
};
