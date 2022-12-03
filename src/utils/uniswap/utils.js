import {computePoolAddress, FACTORY_ADDRESS, Position} from "@uniswap/v3-sdk";
import {Token} from "@uniswap/sdk-core";
import {TOKENS} from "../../config";
import MAINNET_POOL_TICKS from "../../data/mainnet.json";
import OPTIMISM_POOL_TICKS from "../../data/optimism.json";
import POLYGON_POOL_TICKS from "../../data/polygon.json";

export const getPoolAddress = (token0, token1, fee, chain) => {

    const _TOKENS = TOKENS[chain];

    const token0_address = _TOKENS[token0];
    const token1_address = _TOKENS[token1];

    const tokenA = new Token(1, token0_address, 18);
    const tokenB = new Token(1, token1_address, 18);

    const poolAddress = computePoolAddress({
        factoryAddress: FACTORY_ADDRESS,
        tokenA,
        tokenB,
        fee
    }).toLowerCase();

    return poolAddress;
}

export const calcPrice = (sqrtPrice, decimalDelta) => {
    decimalDelta = Math.abs((decimalDelta));
    return ((sqrtPrice / (2 ** 96)) ** 2) / (10 ** decimalDelta);
}

export const tickToPrice = (tick, decimalDelta) => {
    const base = 1.0001;
    return (base ** tick) / (10 ** Math.abs(decimalDelta)).toString();
}

export const getPriceRange = (tickLower, tickUpper, decimalDelta) => {
    const priceLower = tickToPrice(tickLower, decimalDelta);
    const priceUpper = tickToPrice(tickUpper, decimalDelta);
    return {priceLower, priceUpper};
}

export const getPoolTicks = (chainId) => {

    let poolTicks;

    if(chainId == 1){
        poolTicks = MAINNET_POOL_TICKS;
    }
    else if(chainId == 10){
        poolTicks = OPTIMISM_POOL_TICKS;
    }
    else if(chainId == 137){
        poolTicks = POLYGON_POOL_TICKS;
    }
    else{
        alert('Invalid chain id!');
    }

    return poolTicks;
}