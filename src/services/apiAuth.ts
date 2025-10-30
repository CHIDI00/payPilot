import supabase, { supabaseUrl } from "./supabase";
import type { User } from "@supabase/supabase-js";

// SIGNUP
interface SignupParams {
  fullName: string;
  email: string;
  password: string;
}

export async function signup({ fullName, email, password }: SignupParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        // avatar: "",
      },
    },
  });

  if (error) {
    console.error("Supabase signup error:", error.message);
    throw new Error(error.message);
  }

  return data;
}

// LOGIN
interface LoginParams {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginParams) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log(data);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

// GOOGLE SIGNIN/LOGIN
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) throw new Error(error.message);
  return data;
}

// LOGOUT
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

// PROFILE UPDATE
interface updateUserProfileProps {
  password?: string;
  fullName?: string;
  avatar?: File;
}

export async function updateUserProfile({
  password,
  fullName,
  avatar,
}: updateUserProfileProps): Promise<User | null> {
  let userData: User | null = null;

  //  UPDATE PASSWORD
  if (password) {
    const { data, error } = await supabase.auth.updateUser({ password });
    if (error) throw new Error(error.message);
    userData = data?.user ?? null;
  }

  //  UPDATE FULLNAME
  if (fullName) {
    const { data, error } = await supabase.auth.updateUser({
      data: { fullName },
    });
    if (error) throw new Error(error.message);
    userData = data?.user ?? userData;
  }

  if (!avatar) return userData;

  //  UPLOAD PROFILE IMAGE
  const identifier =
    userData?.id ||
    (userData?.email
      ? userData.email.replace(/[@.]/g, "_")
      : `user-${Date.now()}`);

  const fileName = `avatar-${identifier}-${Date.now()}`;
  const { error: storageError } = await supabase.storage
    .from("Avartar")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  //  JOIN IMAGE TO URL
  const avatarUrl = `${supabaseUrl}/storage/v1/object/public/Avartar/${fileName}`;
  const { data: finalData, error: error2 } = await supabase.auth.updateUser({
    data: { avatar: avatarUrl },
  });

  if (error2) throw new Error(error2.message);

  return finalData?.user ?? null;
}
