import {
  createMemberFormSchema,
  updateMemberFormSchema,
} from "@/schemas/staff/member.schemas";
import {
  useCreateStaffMember,
  useUpdateStaffMember,
} from "@/services/staff/members/mutations";
import { useMemberStore } from "@/stores/staff/member.stores";
import type {
  CreateMemberFormSchemaType,
  UpdateMemberFormSchemaType,
} from "@/types/staff/member.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const useMemberForm = () => {
  const { selectedMember } = useMemberStore();
  const { mutateAsync: create, isPending: isCreating } = useCreateStaffMember();
  const { mutateAsync: update, isPending: isUpdating } = useUpdateStaffMember();

  const createForm = useForm<CreateMemberFormSchemaType>({
    resolver: zodResolver(createMemberFormSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
    },
  });

  const updateForm = useForm<UpdateMemberFormSchemaType>({
    resolver: zodResolver(updateMemberFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  // Populate edit form when selectedMember changes
  useEffect(() => {
    if (selectedMember) {
      updateForm.reset({
        firstName: selectedMember.firstName,
        lastName: selectedMember.lastName,
      });
    }
  }, [selectedMember, updateForm]);

  const onCreateSubmit = async (data: CreateMemberFormSchemaType) => {
    await create(data);
  };

  const onUpdateSubmit = async (data: UpdateMemberFormSchemaType) => {
    if (!selectedMember) return;

    await update({
      id: selectedMember.id,
      ...data,
    });
  };

  return {
    createForm,
    updateForm,
    onCreateSubmit,
    onUpdateSubmit,
    isCreating,
    isUpdating,
  };
};
