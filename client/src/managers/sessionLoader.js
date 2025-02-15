import { redirect } from "react-router-dom";
import { supabase } from "../supabaseUtils/supabaseClient";

export const sessionLoader = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    return redirect("/");
  }

  const { data: userProfile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (profileError) {
    throw new Response('Error fetching user profile', { status: 500 });
  }

  return { userProfile, session };
};