export const PROTOCOL = {
    NFT_POSITION_MANAGER: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88'
};

export const ASSETS = ['WETH', 'DAI', 'LINK', 'USDC', 'USDT', 'WBTC', 'AAVE', 'sUSD'];

const MAINNET_TOKENS = {
    WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    DAI: '0x6b175474e89094c44da98b954eedeac495271d0f',
    LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    USDT: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    WBTC: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    AAVE: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
    sUSD: '0x57ab1ec28d129707052df4df418d58a2d46d5f51'
};

const OPTIMISM_TOKENS = {
    WETH: "0x4200000000000000000000000000000000000006",
    DAI: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
    LINK: "0x350a791bfc2c21f9ed5d10980dad2e2638ffa7f6",
    USDC: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    USDT: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
    WBTC: "0x68f180fcce6836688e9084f035309e29bf0a2095",
    AAVE: "0x76fb31fb4af56892a25e32cfc43de717950c9278",
    sUSD: "0x8c6f28f2f1a3c87f0f938b96d27520d9751ec8d9"
};

export const TOKENS = {
    'MAINNET': MAINNET_TOKENS,
    'OPTIMISM': OPTIMISM_TOKENS
}

export const DECIMALS = {
    WETH: 18,
    USDC: 6,
    USDT: 6,
    BUSD: 18,
    TUSD: 18,
    WBTC: 8,
    AAVE: 18,
    BAT: 18,
    DAI: 18,
    ENJ: 18,
    KNC: 18,
    LINK: 18,
    MANA: 18,
    MKR: 18,
    SNX: 18,
    sUSD: 18
}

export const TICK_SPACES = {
    '100': 1,
    '500': 10,
    '3000': 60,
    '10000': 200
}

export const CHAIN_TO_NETWORK = {
    '1': 'MAINNET',
    '10': 'OPTIMISM',
    '137': 'POLYGON'
};

export const S3_URL = 'https://liquidator-dash-icons.s3.ap-south-1.amazonaws.com';