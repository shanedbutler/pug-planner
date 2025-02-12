import { supabase } from "../supabaseUtils/supabaseClient"
import { camelCaseKeys } from "../supabaseUtils/casingUtils";
/**
 * Get all pronouns from supabase
 * @returns Supabase response object
 */
export const fetchAllPronouns = async () => {
   const { data, error } = await supabase
      .from('pronouns')
      .select();

   if (!error) {
      const casedData = camelCaseKeys(data);
      return Object.values(casedData);
   }
   else {
      console.error(error);
   }
};