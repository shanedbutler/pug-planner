import { createClient } from '@supabase/supabase-js'

const anonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const projectUrl = 'https://etlmvtinzotsvwztnbsy.supabase.co';

// Initialize Supabase
export const supabase = createClient(projectUrl, anonKey);
