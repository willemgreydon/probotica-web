import OpenAI from 'openai';
import { env } from '@/lib/config/env';
export const openai = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;
export async function runStructuredAI(system:string, user:string){
  if(!openai) return { ok:false, fallback:true, data:{ summary:'OPENAI_API_KEY missing. Demo fallback active.', nextSteps:['Set OPENAI_API_KEY','Deploy on Vercel','Reconnect the form'] } };
  const res = await openai.chat.completions.create({ model:'gpt-4.1-mini', temperature:.4, response_format:{type:'json_object'}, messages:[{role:'system',content:system},{role:'user',content:user}] });
  return { ok:true, data: JSON.parse(res.choices[0]?.message?.content || '{}') };
}
