import supabase from "./supabase";

export async function logIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error("Provided email or password are incorrect");
  }
  return { data, error };
}
