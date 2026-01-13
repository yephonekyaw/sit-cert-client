import type { NavigationItem } from "@/types/nav.types";
import { BarChart3, CheckCircle, UserLock } from "lucide-react";

export const NAVIGATION_CONFIG: {
  student: NavigationItem[];
  staff: NavigationItem[];
} = {
  student: [
    {
      label: "Requirements",
      href: "/student/requirements",
      icon: CheckCircle,
    },
  ],
  staff: [
    {
      label: "Dashboard",
      href: "/staff/dashboard",
      icon: BarChart3,
    },
    {
      label: "Submissions",
      href: "/staff/submissions",
      icon: CheckCircle,
    },
    {
      label: "Staff Management",
      href: "/staff/members",
      icon: UserLock,
    },
  ],
};
