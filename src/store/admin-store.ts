import { create } from "zustand";
import { UserState } from "../interface/userTypes";

const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

const useAdminStore = create<UserState>((set) => ({
  user: getUserFromLocalStorage(),
  isAuthenticated: false,
  login: (user) => {
    set({ user, isAuthenticated: true });
    localStorage.setItem("user", JSON.stringify(user));
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem("user");
  },
}));

export default useAdminStore;
