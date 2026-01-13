import type { MemberStoreState } from "@/types/staff/member.types";
import { create } from "zustand";

export const useMemberStore = create<MemberStoreState>((set) => ({
  createModalState: false,
  updateModalState: false,
  deleteModalState: false,
  selectedMember: null,

  setCreateModalState: (state) => set({ createModalState: state }),
  setUpdateModalState: (state) => set({ updateModalState: state }),
  setDeleteModalState: (state) => set({ deleteModalState: state }),
  setSelectedMember: (member) => set({ selectedMember: member }),
  clearSelectedMember: () => set({ selectedMember: null }),
}));
