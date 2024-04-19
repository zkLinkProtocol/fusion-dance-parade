import axiosInstance from 'utils/axios';

type Response = {
  status: string;
  message: string;
  result?: any;
  error?: any;
  data?: any;
};

const isProd = process.env.NEXT_PUBLIC_APP_ENV;
const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const BASE_URL = isProd ? apiBaseURL : '/app-api';
export const BASE_URL_API = `${BASE_URL}/api`;
export const BASE_URL_POINTS = `${BASE_URL}/points`;
export const BASE_URL_TOKENS = `${BASE_URL}/tokens`;
export const BASE_URL_TWITTER = `${BASE_URL}/twitter`;
export const BASE_URL_LRT_POINTS = `${BASE_URL}/lrt-points`;
export const BASE_URL_QUEST = `${BASE_URL}/quest-api`;

export const TEST_MEME_API = 'http://3.114.68.110:8097';
//'http://localhost:3050';
//'http://3.114.68.110:8097'

export type BindInviteCodeWithAddressParams = {
  address: string;
  code?: string | null;
  siganture: string;
  accessToken: string;
};

//meme
export const checkMintEligibility = (address: string): Promise<Response> => {
  return axiosInstance.get(`${TEST_MEME_API}/meme/check/address`, {
    params: { address },
  });
};

export const getMemeMintSignature = (address: string): Promise<Response> => {
  return axiosInstance.post(`${TEST_MEME_API}/meme/mint/meme/nft`, {
    address,
    chain: 'Linea',
    coin: 'Foxy',
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

export type TotalSupply = {
  type: string;
  hex: string;
};

export type ExplorerTvlItem = {
  l2Address: string;
  l1Address: string;
  networkKey: string;
  symbol: string;
  name: string;
  decimals: number;
  usdPrice: number;
  liquidity: number;
  iconURL: string;
  totalSupply: TotalSupply;
  tvl: string;
};

export const getExplorerTokenTvl = (isall: boolean): Promise<ExplorerTvlItem[]> =>
  axiosInstance.get(`https://explorer-api.zklink.io/tokens/tvl`, {
    params: { isall },
  });

export const validTwitter = (twitterHandler: string, address?: string): Promise<Response> => {
  return axiosInstance.get(`${BASE_URL_API}/invite/validTwitter2`, {
    params: {
      twitterHandler,
      address,
    },
  });
};

export type TxHashResponse = {
  isValid: boolean;
};

export type TxHashParams = {
  txHash: string;
  chainId: string;
  address?: string;
};
export const getTxByTxHash = (params: TxHashParams): Promise<TxHashResponse> =>
  axiosInstance.get(`${BASE_URL_API}/invite/getTxByTxHash`, {
    params,
  });

export type RegisterAccountParams = {
  address: string;
  code?: string | null;
  siganture: string;
  accessToken?: string | null;
  chainId: string | number;
  txHash: string;
};

export const registerAccount = (data: RegisterAccountParams): Promise<Response> => {
  console.log(data);
  if (!data.code) {
    delete data.code;
  }
  return axiosInstance.post(`${BASE_URL_API}/invite/register/account`, {
    ...data,
  });
};

export type AccessTokenParams = {
  code: string;
  grant_type: string;
  client_id: string;
  redirect_uri: string;
  code_verifier: string;
};
export type AccessTokenResponse = {
  token_type: string;
  expires_in: number;
  access_token: string;
  scope: string;
};
// export const getTwitterAccessToken = (params: AccessTokenParams): Promise<AccessTokenResponse> =>
//   axiosInstance.post('/twitter/2/oauth2/token', qs.stringify({ ...params }), {
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//   })

export type TwitterUserResponse = {
  data: {
    id: string;
    name: string;
    username: string;
  };
};
export const getTwitterUser = (accessToken: string): Promise<TwitterUserResponse> =>
  axiosInstance.get('/twitter/2/users/me', {
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const checkOkx = (address: string): Promise<Response> =>
  axiosInstance.get(`${BASE_URL_API}/invite/check/okx`, {
    params: { addressList: [address] },
  });

export const visitReward = (address: string): Promise<Response> =>
  axiosInstance.get(`${BASE_URL_API}/invite/visit/reward`, {
    params: { address },
  });

export const getEigenlayerPoints = (address: string) =>
  axiosInstance.get(`${BASE_URL_LRT_POINTS}/points/forward/puffer/zklink_point`, {
    params: { address },
    headers: {
      'client-id': '08879426f59a4b038b7755b274bc19dc',
    },
  });

export const getPufferPoints = (address: string) =>
  axiosInstance.get(`${BASE_URL_LRT_POINTS}/points/${address}/pufferpoints`);

export interface MagPieResponse {
  errno: number;
  errmsg: string;
  data: [
    {
      address: string;
      tokenAddress: string;
      points: {
        eigenpiePoints: number;
        eigenLayerPoints: number;
      };
      updatedAt: number;
    },
  ];
}

export const getMagPiePoints = (address: string): Promise<MagPieResponse> =>
  axiosInstance.get(`${BASE_URL_LRT_POINTS}/magpie/points`, {
    params: { address },
  });

export interface RenzoResponse {
  errno: number;
  errmsg: string;
  data: [
    {
      address: string;
      tokenAddress: string;
      points: {
        renzoPoints: number;
        eigenLayerPoints: number;
      };
      updatedAt: number;
    },
  ];
}
export const getRenzoPoints = (address: string): Promise<RenzoResponse> =>
  axiosInstance.get(`${BASE_URL_LRT_POINTS}/renzo/points`, {
    params: { address },
  });

export const getTradeMarkRank = (address: string): Promise<Response> =>
  axiosInstance.get(`${BASE_URL_API}/referrer/tradeMark/balance/rank`, {
    params: { address },
  });

export const getTopInviteAndRandom = (date?: string): Promise<Response> =>
  axiosInstance.get(`${BASE_URL_API}/referrer/daily/topInviteAndRandom`, {
    params: { date },
  });

export interface LrtNovaPointsData {
  address: string;
  points: string;
  realPoints: number;
  balance: string;
  tokenAddress: string;
  updated_at: number;
}

export interface LrtNovaPoints {
  errno: number;
  errmsg: string;
  total_points: string;
  data: LrtNovaPointsData[];
}

export const getLayerbankNovaPoints = (address: string): Promise<LrtNovaPoints> =>
  axiosInstance.get(`${BASE_URL_LRT_POINTS}/nova/points`, { params: { address } });

export const getLayerbankTokenPoints = (address: string, tokenAddress: string): Promise<LrtNovaPoints> =>
  axiosInstance.get(`${BASE_URL_LRT_POINTS}/nova/points/token`, {
    params: { address, tokenAddress },
  });

export interface LinkswapNovaPoints {
  code: number;
  message: string;
  data: {
    address: string;
    pairs: {
      novaPoint: string;
      pair: string;
      totalPoint: string;
    }[];
  };
}
export const getLinkswapNovaPoints = (address: string): Promise<LinkswapNovaPoints> =>
  axiosInstance.get('https://api.linkswap.finance/api/Zklink/AddressPoint', {
    params: { address },
  });

export const getRoyaltyBooster = (address: string): Promise<Response> =>
  axiosInstance.get(`${BASE_URL_POINTS}/addressTokenTvl/getAccountLoyaltyBooster`, {
    params: { address },
  });
