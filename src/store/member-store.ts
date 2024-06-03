import { create } from "zustand";
import { useQuery } from "@tanstack/react-query";
import { fetchMembers, getMemberProfile } from "../services/members";

export const useMemberStore = create(() => ({
  fetchMembers: (status: string) => {
    // Fetch members
    const membersQuery = useQuery({
      queryKey: ["members", status],
      queryFn: () => fetchMembers(status),
    });

    return membersQuery;
  },
  getProfile: (id: number) => {
    // Fetch members
    const memberProfile = useQuery({
      queryKey: ["members", id],
      queryFn: () => getMemberProfile(id),
    });
    return memberProfile.data;
  },
}));
