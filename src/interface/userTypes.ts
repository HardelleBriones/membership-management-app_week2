export interface UserInfo {
  id: string;
  email: string;
  full_name: string;
  username: string;
}

export interface UserInfoNoId {
  email: string;
  full_name: string;
  username: string;
}

export interface UserState {
  user: UserInfo | null;
  login: (user: UserInfo) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
