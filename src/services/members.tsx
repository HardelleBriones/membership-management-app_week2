import { supabase } from "../supabaseClient";
import { MemberFormWithAddress } from "../models/Members";
import { DisplayMemberEditWithAddressType } from "../models/Members";
export const fetchMembers = async (status: string) => {
  let query = supabase.from("membership").select("*");
  if (status !== "") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log(data);
  }

  return data;
};

export const addMember = async (newMember: MemberFormWithAddress) => {
  const { data, error } = await supabase
    .from("membership")
    .insert([newMember])
    .select();

  if (error) {
    console.error("Error inserting new member:", error);
    return { success: false, error };
  }

  console.log("New member inserted:", data);
  return { success: true, data };
};

export const getMemberProfile = async (id: number) => {
  const { data, error } = await supabase
    .from("membership")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching member profile:", error);
  } else {
    console.log(data);
  }
  return data;
};

export const updateMemberProfile = async (
  member: DisplayMemberEditWithAddressType,
) => {
  const { data, error } = await supabase
    .from("membership")
    .update([member])
    .eq("email", member.email)
    .select();

  if (error) {
    console.error("Error fetching member profile:", error);
  } else {
    console.log(data);
  }
  return data;
};

export const deleteMember = async (id: number) => {
  const { error } = await supabase.from("membership").delete().eq("id", id);

  if (error) {
    console.error("Error fetching member profile:", error);
  }
};
