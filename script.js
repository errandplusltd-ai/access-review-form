const SUPABASE_URL = "https://bzkezkimoanooecughxa.supabase.co/rest/v1/";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_9AxpZKClWmvqxjea8YS8EA_smmSm4JN";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
