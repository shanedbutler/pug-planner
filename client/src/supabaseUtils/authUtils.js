import { supabase } from "./supabaseClient";

/**
 * Saves newly registered user to profiles table and
 * sets new user to localStorage
 * @param {user} userBody 
 * @returns {user}
 */
export const saveProfile = async (userBody) => {
    const {user, error} = await supabase
    .from('profiles')
    .insert({
        id: userBody.id,
        first_name: userBody.firstName,
        last_name: userBody.lastName,
        email: userBody.email,
        phone: userBody.phone,
        primary_position_id: userBody.primaryPositionId,
        secondary_position_id: userBody.secondaryPositionId,
        pronoun_id: userBody.pronounId,
        club: userBody.club,
        emergency_name: userBody.emergencyName,
        emergency_phone: userBody.emergencyPhone,
        active: userBody.active,
    })
    .select(
        'id', 
        'first_name',
        'last_name', 
        'email', 
        'admin');
    
    if (error) {
        console.error(error);
        alert("User profile creation failed");
    } else {
        _setLocalUser(user);
    }
};

const _setLocalUser = (user) => {
    localStorage.setItem(
        'userProfile',
        JSON.stringify({
            id: user.id,
            fullName: `${user.fullName} ${user.lastName}`,
            email: user.email,
            admin: user.admin,
        })
    );
}