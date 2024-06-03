import { supabase } from "../supabaseClient";
import { UserInfo } from "../interface/userTypes";
import { InsertAdmin, BasicAdmin } from "../models/Admin";
import { UserInfoNoId } from "../interface/userTypes";
export const addAdmin = async (newMember: InsertAdmin) => {
  const { data, error } = await supabase
    .from("profiles")
    .insert([newMember])
    .select();

  if (error) {
    console.error("Error inserting new member:", error);
    throw error; // Throwing error to be caught by the mutation function
  }

  console.log("New member inserted:", data);
  return { success: true, data };
};

export const updateAdminProfile = async (admin: UserInfoNoId) => {
  const { data, error } = await supabase
    .from("profiles")
    .update([admin])
    .eq("email", admin.email)
    .select();

  if (error) {
    console.error("Error fetching member profile:", error);
  } else {
    console.log(data);
  }
  return data;
};

export const fetchAdminProfile = async (email: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    console.error("Error fetching member profile:", error);
  }
  const userInfo: UserInfo = {
    id: data.id,
    email: data.email,
    full_name: data.full_name,
    username: data.username,
  };

  return userInfo;
};
