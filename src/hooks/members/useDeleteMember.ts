import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMember } from "../../services/members";
export const useDeleteMember = () => {
  // Query client
  const queryClient = useQueryClient();
  //  Mutation to delete a member
  const deleteMemberMutation = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });

  return deleteMemberMutation;
};
