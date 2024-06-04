import { useQuery } from "@tanstack/react-query";
import { getMemberProfile } from "../../services/members";

export const useGetMember = (id: number) => {
  const memberProfile = useQuery({
    queryKey: ["members", id],
    queryFn: () => getMemberProfile(id),
  });
  return memberProfile.data;
};
