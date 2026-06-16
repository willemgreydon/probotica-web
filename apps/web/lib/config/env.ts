import { z } from 'zod';
const envSchema = z.object({ OPENAI_API_KEY: z.string().min(1).optional(), NEXT_PUBLIC_SITE_URL: z.string().url().default('https://probotica.at'), CONTACT_EMAIL: z.string().email().default('hello@probotica.at') });
export const env = envSchema.parse({ OPENAI_API_KEY: process.env.OPENAI_API_KEY, NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://probotica.at', CONTACT_EMAIL: process.env.CONTACT_EMAIL || 'hello@probotica.at' });
