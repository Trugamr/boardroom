import { z } from 'zod'

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  COOKIE_SECRET: z.string().nonempty(),
  STEAM_API_KEY: z.string().nonempty(),
  STEAM_CALLBACK_URL: z.string().url(),
})

/**
 * Get environment variables on the server
 */
export function getServerEnv() {
  return serverEnvSchema.parse(process.env)
}
