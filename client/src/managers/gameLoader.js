import { camelCaseKeys } from "../supabaseUtils/casingUtils";
import { supabase } from "../supabaseUtils/supabaseClient";
import { userProfilesLoader } from "./userProfileLoader";

export const gameByIdLoader = async ({ params }) => {
    const { data: game, error } = await supabase
      .from('games')
      .select(`
        *,
        primary_host:primary_host_id(id, full_name, first_name, phone),
        secondary_host:secondary_host_id(id, full_name, first_name, phone),
        game_roster(
            *, 
            profile:user_profile_id(
              *, 
              primary_position:primary_position_id(*), 
              secondary_position:secondary_position_id(*)
            )
        )
      `)
      .eq('id', params.id)
      .single();
  
    if (error) {
      throw new Error('Failed to fetch game details');
    }
  
    return { game: camelCaseKeys(game) };
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