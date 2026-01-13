import axiosClient from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type {
  StaffDataItem,
  CreateMemberFormSchemaType,
  UpdateMemberFormSchemaType,
} from "@/types/staff/member.types";

const getStaffMembers = async () =>
  axiosClient
    .get<
      ApiResponse<{
        members: StaffDataItem[];
        totalCount: number;
      }>
    >("/staff/members")
    .then((res) => res.data);

const createStaffMember = async (data: CreateMemberFormSchemaType) =>
  axiosClient
    .post<ApiResponse<StaffDataItem>>("/staff/members", data)
    .then((res) => res.data);

const updateStaffMember = async (
  data: UpdateMemberFormSchemaType & { id: string }
) =>
  axiosClient
    .put<ApiResponse<StaffDataItem>>(
      `/staff/members/${encodeURIComponent(data.id)}`,
      data
    )
    .then((res) => res.data);

export { getStaffMembers, createStaffMember, updateStaffMember };
