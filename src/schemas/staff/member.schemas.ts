import { z } from "zod";

export const createMemberFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const updateMemberFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});
