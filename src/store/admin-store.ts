import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserState } from "../interface/userTypes";

const useAdminStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user: user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "admin",
    },
  ),
);

export default useAdminStore;
