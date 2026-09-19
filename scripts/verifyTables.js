import { supabase } from '../src/lib/supabase.js';

async function verifyTables() {
  const { data: dealers, error: dealerErr } = await supabase.from('dealers').select('*');
  const { data: quotes, error: quoteErr } = await supabase.from('quotations').select('*');
  const { data: otps, error: otpErr } = await supabase.from('otp_verifications').select('*');

  console.log(JSON.stringify({
    dealers: { count: dealers?.length, sample: dealers?.[0]?.firm_name, error: dealerErr?.message },
    quotations: { count: quotes?.length, sample: quotes?.[0]?.id, error: quoteErr?.message },
    otps: { count: otps?.length, error: otpErr?.message }
  }, null, 2));
}

verifyTables();
