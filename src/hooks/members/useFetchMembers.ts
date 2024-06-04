import { useQuery } from "@tanstack/react-query";
import { fetchMembers } from "../../services/members";

type StatusType = "Active" | "Pending" | "Inactive" | "Suspended" | "";

export const useFetchMembers = (status: StatusType) => {
  const membersQuery = useQuery({
    queryKey: ["members", status],
    queryFn: () => fetchMembers(status),
  });
  return membersQuery;
};
