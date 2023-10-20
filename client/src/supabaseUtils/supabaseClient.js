import { createClient } from '@supabase/supabase-js'

const projectUrl = 'https://etlmvtinzotsvwztnbsy.supabase.co';
const anonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Initialize Supabase
export const supabase = createClient(projectUrl, anonKey);
