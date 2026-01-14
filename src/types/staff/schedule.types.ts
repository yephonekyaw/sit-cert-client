import type z from "zod";
import type { scheduleFormSchema } from "@/schemas/staff/schedule.schemas";
import type { GetSchedulesItem } from "@/services/staff/schedules/types";

type ScheduleFormSchemaType = z.infer<typeof scheduleFormSchema>;

type CreateScheduleFormSchemaType = Omit<
  ScheduleFormSchemaType,
  "submissionDate" | "submissionTime"
> & {
  submissionDeadline: string; // Combined date and time in UTC
};

type UpdateScheduleFormSchemaType = CreateScheduleFormSchemaType & {
  id: string;
};

interface ScheduleStoreState {
  selectedSchedule: GetSchedulesItem | null;
  setSelectedSchedule: (schedule: GetSchedulesItem | null) => void;
  clearSelectedSchedule: () => void;
  clearScheduleStore: () => void;

  selectedYearFilter: string;
  setSelectedYearFilter: (year: string) => void;
}

interface ScheduleFormProps {
  isEdit: boolean;
  scheduleId?: string;
}

export type {
  ScheduleFormSchemaType,
  ScheduleStoreState,
  ScheduleFormProps,
  CreateScheduleFormSchemaType,
  UpdateScheduleFormSchemaType,
};
