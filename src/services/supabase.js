import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://fzdhmsscbygvhkzygvbq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6ZGhtc3NjYnlndmhrenlndmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxNjE5MzgsImV4cCI6MjA0NzczNzkzOH0.UaZwNvHkCAR0Wk9B9EE7OALdsQrb34ihtTfKsonGnQo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
