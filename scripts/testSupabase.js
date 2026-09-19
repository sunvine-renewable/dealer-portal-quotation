import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wyberzvcyrjipjqpotwe.supabase.co';
const supabaseKey = 'sb_publishable_XzbS-fQMtSGf2LjFO40yzw_LtT98nG6';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.log(JSON.stringify({ status: 'error', error: error.message }));
    } else {
      console.log(JSON.stringify({ status: 'connected', url: supabaseUrl, session: data.session }));
    }
  } catch (err) {
    console.log(JSON.stringify({ status: 'exception', message: err.message }));
  }
}

testConnection();
