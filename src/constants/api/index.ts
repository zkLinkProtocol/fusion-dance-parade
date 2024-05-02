import { nodeType } from 'config/zklin-networks';
import axiosInstance from 'utils/axios';

type Response = {
  status: string;
  message: string;
  result?: any;
  error?: any;
  data?: any;
};

const isProd = nodeType === 'nexus' ? true : false;
const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const BASE_URL = isProd ? apiBaseURL : '/app-api';
export const BASE_URL_API = `${BASE_URL}/api`;
export const BASE_URL_POINTS = `${BASE_URL}/points`;
export const BASE_URL_TOKENS = `${BASE_URL}/tokens`;
export const BASE_URL_TWITTER = `${BASE_URL}/twitter`;
export const BASE_URL_LRT_POINTS = `${BASE_URL}/lrt-points`;
export const BASE_URL_QUEST = `${BASE_URL}/quest-api`;

export const MEME_BASE_API = isProd ? `${apiBaseURL}/api` : 'https://goerli.app.zklink.io/api';

export type BindInviteCodeWithAddressParams = {
  address: string;
  code?: string | null;
  siganture: string;
  accessToken: string;
};

//meme

///meme/mint/chad/signature
export const getMergeSignature = (address: string, tokenIds: any[]): Promise<Response> => {
  return axiosInstance.post(`${MEME_BASE_API}/meme/mint/chad/signature`, {
    address,
    tokenIds,
  });
};

///meme/mintChad/number
export const getMemeMintChadNumber = (): Promise<Response> => {
  return axiosInstance.get(`${MEME_BASE_API}/meme/mintChad/number`);
};
export const checkMintEligibility = (address: string): Promise<Response> => {
  return axiosInstance.get(`${MEME_BASE_API}/meme/check/address`, {
    params: { address },
  });
};

export const getMemeMintSignature = ({
  address,
  chain,
  coin,
}: {
  address: string;
  chain: string;
  coin: string;
}): Promise<Response> => {
  return axiosInstance.post(`${MEME_BASE_API}/meme/mint/meme/nft`, {
    address,
    chain,
    coin,
  });
};
export const bindInviteCodeWithAddress = (data: BindInviteCodeWithAddressParams): Promise<Response> => {
  if (!data.code) {
    delete data.code;
  }
  return axiosInstance.post(`${BASE_URL_API}/invite/bind/twitter`, {
    ...data,
  });
};

export const checkInviteCode = (code: string): Promise<Response> => {
  return axiosInstance.get(`${BASE_URL_API}/invite/validCode`, {
    params: {
      code,
    },
  });
};

export const getRemainDrawCount = (address: string): Promise<Response> => {
  return axiosInstance.get(`${BASE_URL_API}/invite/draw/nft/remain`, {
    params: { address },
  });
};

export const drawTrademarkNFT = (address: string): Promise<Response> => {
  return axiosInstance.post(`${BASE_URL_API}/invite/draw/nft`, {
    address,
  });
};

export const getRemainMysteryboxDrawCount = (address: string): Promise<Response> => {
  return axiosInstance.get(`${BASE_URL_API}/invite/draw/mysterybox/remain`, {
    params: { address },
  });
};

export const getRemainMysteryboxDrawCountV2 = (address: string): Promise<Response> => {
  return axiosInstance.get(`${BASE_URL_API}/invite/draw/mysterybox/v2/remain`, {
    params: { address },
  });
};

// for mint box params
export const mintMysteryboxNFT = (address: string): Promise<Response> => {
  return axiosInstance.post(`${BASE_URL_API}/invite/mint/mysterybox`, {
    address,
  });
};

export const mintMysteryboxNFTV2 = (address: string): Promise<Response> => {
  return axiosInstance.post(`${BASE_URL_API}/invite/mint/mysterybox/v2`, {
    address,
  });
};

export const openMysteryboxNFT = (address: string): Promise<Response> => {
  return axiosInstance.post(`${BASE_URL_API}/invite/open/mysterybox`, {
    address,
  });
};

export const openMysteryboxNFTV2 = (address: string): Promise<Response> => {
  return axiosInstance.post(`${BASE_URL_API}/invite/open/mysterybox/v2`, {
    address,
  });
};

export const getRemainMysteryboxOpenableCount = (address: string): Promise<Response> => {
  return axiosInstance.get(`${BASE_URL_API}/invite/open/mysterybox/remain`, {
    params: { address },
  });
};

export const getRemainMysteryboxOpenableCountV2 = (address: string): Promise<Response> => {
  return axiosInstance.get(`${BASE_URL_API}/invite/open/mysterybox/v2/remain`, {
    params: { address },
  });
};

export const getMintSignature = (address: string): Promise<Response> => {
  return axiosInstance.get(`${BASE_URL_API}/invite/validate/nft`, {
    params: { address, projectId: 'NOVA-SBT-1' },
  });
};
export const getInvite = (address: string): Promise<Response> => axiosInstance.get(`${BASE_URL_API}/invite/${address}`);

export const getReferrer = (address: string): Promise<Response> =>
  axiosInstance.get(`${BASE_URL_API}/referrer/${address}`);

export const getDepositETHThreshold = (): Promise<{ ethAmount: number }> =>
  axiosInstance.get(`${BASE_URL_POINTS}/addressTokenTvl/getDepositEthThreshold`);

export const getAccounTvl = (address: string): Promise<Response> =>
  axiosInstance.get(`${BASE_URL_POINTS}/addressTokenTvl/getAccounTvl`, {
    params: { address },
  });

export const getAccountPoint = (address: string): Promise<Response> =>
  axiosInstance.get(`${BASE_URL_POINTS}/addressTokenTvl/getAccountPoint`, {
    params: { address },
  });

export const getTotalTvl = (): Promise<Response> => axiosInstance.get(`${BASE_URL_POINTS}/addressTokenTvl/getTotalTvl`);
export const getActiveAccounts = (): Promise<Response> => axiosInstance.get(`${BASE_URL_API}/invite/getActiveAccounts`);

export const getAccountTvl = (address: string): Promise<Response> =>
  axiosInstance.get(`${BASE_URL_POINTS}/addressTokenTvl/getAccounTvl`, {
    params: {
      address,
    },
  });

export const getGroupTvl = (address: string): Promise<Response> =>
  axiosInstance.get(`${BASE_URL_POINTS}/addressTokenTvl/getGroupTvl`, {
    params: {
      address,
    },
  });

export const getTotalTvlByToken = (): Promise<Response> =>
  axiosInstance.get(`${BASE_URL_POINTS}/addressTokenTvl/getTotalTvlByToken`);

export const getReferralTvl = (address: string): Promise<Response> =>
  axiosInstance.get(`${BASE_URL_POINTS}/addressTokenTvl/getReferralTvl`, {
    params: { address },
  });

export const getAccountTwitter = (params: any): Promise<Response> =>
  axiosInstance.post(`${BASE_URL_API}/invite/account/twitter`, params);

export type SupportToken = {
  address: {
    chain: string;
    l1Address: string;
    l2Address: string;
  }[];
  symbol: string;
  decimals: number;
  cgPriceId: string;
  type: string;
  yieldType: string[];
  multiplier: number;
  multipliers: { multiplier: number; timestamp: number }[];
};

export type TokenPriceInfo = {
  l2Address: string;
  l1Address: string;
  symbol: string;
  name: string;
  decimals: number;
  usdPrice: number;
  liquidity: number;
  iconURL: string;
};

export const getAccountRefferalsTVL = (address: string, page = 1, limit = 100): Promise<Response> =>
  axiosInstance.get(`${BASE_URL_POINTS}/addressTokenTvl/getAccountRefferalsTVL`, {
    params: { address, page, limit },
  });

export const getSupportTokens = (): Promise<SupportToken[]> =>
  axiosInstance.get(`${BASE_URL_POINTS}/tokens/getSupportTokens`);
export const getSupportedTokens = (): Promise<SupportToken[]> =>
  axiosInstance.get(`${BASE_URL_POINTS}/tokens/getSupportTokens`);
export const getTokenPrice = (address: string): Promise<TokenPriceInfo> =>
  axiosInstance.get(`${BASE_URL_POINTS}/tokens/${address}`);

export type PageParams = {
  page: number;
  limit: number;
};

export const getAccountsRank = (params?: PageParams): Promise<Response> =>
  axiosInstance.get(`${BASE_URL_POINTS}/addressTokenTvl/getAccountsRank`, {
    params,
  });

export const getAccountRank = (address: string): Promise<Response> =>
  axiosInstance.get(`${BASE_URL_POINTS}/addressTokenTvl/getAccountRank`, {
    params: { address },
  });
