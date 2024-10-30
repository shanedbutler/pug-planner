import { supabase } from "../supabaseUtils/supabaseClient";
import { userProfilesLoader } from "./userProfileLoader";

export const gameByIdLoader = async ({ params }) => {
    const { data: game, error } = await supabase
      .from('games')
      .select('*')
      .eq('id', params.id)
      .single();
  
    if (error) {
      throw new Error('Failed to fetch game details');
    }
  
    return { game };
  };

  export const gameByIdEditLoader = async (args) => {
    const gamePromise = gameByIdLoader(args);
    const profilesPromise = userProfilesLoader();
  
    const [gameResult, profilesResult] = await Promise.all([gamePromise, profilesPromise]);
  
    return {
      ...gameResult,
      ...profilesResult,
    };
  };