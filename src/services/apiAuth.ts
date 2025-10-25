import supabase from "./supabase";

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

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/invoices`,
    },
  });
  if (error) throw new Error(error.message);
  return data;
}
