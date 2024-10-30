import { camelCaseKeys } from "../supabaseUtils/casingUtils";
import { supabase } from "../supabaseUtils/supabaseClient";

export const userProfileByIdLoader = async ({ params }) => {
   const { data: userProfile, error } = await supabase
      .from('profiles')
      .select(`
         *,
         pronoun:pronoun_id(name),
         primary_position:primary_position_id(name),
         secondary_position:secondary_position_id(name),
         appearances:game_roster(count)
      `)
      .eq('id', params?.id)
      .single();

   if (error) {
      console.error(error);
      throw new Error('Failed to fetch user profile');
   }

   if (!userProfile) {
      throw new Error('User profile not found');
   }
   
   return { userProfile: camelCaseKeys(userProfile) };
}

export const userProfilesLoader = async () => {
   const { data: userProfiles, error } = await supabase
      .from('profiles')
      .select();
   if (!error) {
      return { players: camelCaseKeys(userProfiles) };
   } else {
      console.error(error);
      throw new Error('Failed to fetch user profiles');
   }
}