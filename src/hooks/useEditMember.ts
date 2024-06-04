import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMemberProfile } from "../services/members";

export const useEditMember = () => {
  // Query client
  const queryClient = useQueryClient();
  // Mutation to edit a member
  const editMemberMutation = useMutation({
    mutationFn: updateMemberProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });

  return editMemberMutation;
};
