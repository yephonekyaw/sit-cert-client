import { z } from "zod";
import {
  createMemberFormSchema,
  updateMemberFormSchema,
} from "@/schemas/staff/member.schemas";

export type StaffDataItem = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
};

export type CreateMemberFormSchemaType = z.infer<typeof createMemberFormSchema>;
export type UpdateMemberFormSchemaType = z.infer<typeof updateMemberFormSchema>;

export interface MemberStoreState {
  createModalState: boolean;
  updateModalState: boolean;
  deleteModalState: boolean;
  selectedMember: StaffDataItem | null;

  setCreateModalState: (state: boolean) => void;
  setUpdateModalState: (state: boolean) => void;
  setDeleteModalState: (state: boolean) => void;
  setSelectedMember: (member: StaffDataItem | null) => void;
  clearSelectedMember: () => void;
}
