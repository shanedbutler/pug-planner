import { createClient } from '@supabase/supabase-js'

const projectUrl = 'https://etlmvtinzotsvwztnbsy.supabase.co';
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase
export const supabase = createClient(projectUrl, anonKey);
