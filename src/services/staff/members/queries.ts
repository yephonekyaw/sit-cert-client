import { useQuery } from "@tanstack/react-query";
import { getStaffMembers } from "./apis";

const useGetStaffMembers = () => {
  return useQuery({
    queryKey: ["staff", "members"],
    queryFn: getStaffMembers,
    staleTime: 60 * 60 * 1000,
    refetchInterval: 60 * 60 * 1000,
  });
};

export { useGetStaffMembers };
