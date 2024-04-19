// You can't destruct `process.env` as a regular object, so you have to do it manually here.

import zod from 'zod';

const envSchema = zod.object({
  APP_NAME: zod.string().min(1),
  ALCHEMY_RPC_ID: zod.string().min(1),
  INFURA_RPC_ID: zod.string().min(1),
  WALLETCONNECT_PROJECT_ID: zod.string().min(1),
});

export const env = envSchema.parse({
  APP_NAME: 'Rivers',
  WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  ALCHEMY_RPC_ID: process.env.NEXT_PUBLIC_ALCHEMY_ID,
  INFURA_RPC_ID: process.env.NEXT_PUBLIC_INFURA_ID,
});
