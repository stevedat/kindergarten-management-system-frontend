import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rzuwqfvcinzdkjzlcqel.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6dXdxZnZjaW56ZGtqemxjcWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2ODk3MDksImV4cCI6MjA3MzI2NTcwOX0.T8_Uq0Goc_uwsQQT_dr8hz7L3pneTwalQtyRKMoBay8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
