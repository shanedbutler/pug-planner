import { supabase } from "../supabaseUtils/supabaseClient";
import { camelCaseKeys } from "../supabaseUtils/casingUtils";

/**
 * Get positions from supabase
 * @returns Array of positions with id and name properties
 */
export const fetchAllPositions = async () => {
   const { data, error } = await supabase
      .from('positions')
      .select();

   if (!error) {
      const casedData = camelCaseKeys(data);
      return Object.values(casedData);
   }
   else {
      console.error(error);
   }
};
