import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addMember } from "../../services/members";

export const useAddMember = () => {
  // Query client
  const queryClient = useQueryClient();

  // Mutation to add a new member
  const newMemberMutation = useMutation({
    mutationFn: addMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
  return newMemberMutation;
};
