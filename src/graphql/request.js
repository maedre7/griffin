import {request} from 'graphql-request';
import {queryPoolTicks, queryDailyVolume, queryCurrentState, queryUserPositions} from './query';
import {getPriceRange} from "../utils/uniswap/utils";
import {SUBGRAPHS} from "./config";

const fetchPoolTicks = async(skip = 0, poolAddress, endpoint) => {
    try{
        const count = 1000;
        const variables = {count, skip, poolAddress};
        const result = await request(endpoint, queryPoolTicks, variables);
        const ticks = result.ticks;
        return ticks;
    }
    catch(e) {
        console.log(e);
    }
}

export const fetchAllPoolTicks = async(poolAddress, chain) => {

    const endpoint = SUBGRAPHS[chain];

    try{
        const PAGE_SIZE = 3;
        let result= [];
        let page = 0;

        while(true){
            const [pool1, pool2, pool3] = await Promise.all([
                fetchPoolTicks(1000 * page, poolAddress, endpoint),
                fetchPoolTicks(1000 * (page+1), poolAddress, endpoint),
                fetchPoolTicks(1000 * (page+2), poolAddress, endpoint),
            ]);

            result = [...result, ...pool1, ...pool2, ...pool3];

            if (pool1.length === 0 || pool2.length === 0 || pool3.length === 0) {
                break;
            }
            page += PAGE_SIZE;
        }

        return result;
    }
    catch(e){
        console.log(e);
    }

};

export const fetchAverageVolume = async(poolAddress, chain) => {
    try{
        const endpoint = SUBGRAPHS[chain];
        const count = 7;
        const variables = {count, poolAddress};
        const result = await request(endpoint, queryDailyVolume, variables);
        const volumes = result.poolDayDatas;

        const averageVolume = volumes.reduce((total, {volumeUSD}) => total + Number(volumeUSD), 0) / volumes.length;

        return averageVolume;
    }
    catch(e) {
        console.log(e);
    }
}

export const fetchCurrentState = async(poolAddress, chain) => {
    try{
        const endpoint = SUBGRAPHS[chain];
        const variables = {poolAddress};
        const result = await request(endpoint, queryCurrentState, variables);
        /*const {sqrtPrice, tick, token0: {decimals: token0Decimals}, token1: {decimals: token1Decimals}} = result.pool;

        const decimalDelta = token0Decimals - token1Decimals;
        const token0Price = calcPrice(sqrtPrice, decimalDelta);
        const token1Price = 1 / token0Price;

        return {token0Price, token1Price, tick};*/
        return result.pool;
    }
    catch(e) {
        console.log(e);
    }
}

export const fetchUserPositions = async(user, network) => {
    try{
        const endpoint = SUBGRAPHS[network];
        const variables = {user};
        const result = await request(endpoint, queryUserPositions, variables);
        const positions = result.positions;
        const userPositions = positions.map((position) => {
            const {depositedToken0: amount0, depositedToken1: amount1, id, liquidity, owner, pool: {feeTier}, tickLower: {tickIdx: tickLower}, tickUpper: {tickIdx: tickUpper}, token0: {symbol: symbol0, decimals: decimal0}, token1: {symbol: symbol1, decimals: decimal1}} = position;
            const {priceLower, priceUpper} = getPriceRange(tickLower, tickUpper, decimal0 - decimal1);
            return {amount0, amount1, id, liquidity, owner, feeTier, tickLower, tickUpper, symbol0, symbol1, decimal0, decimal1, priceLower, priceUpper};
        });
        console.log(userPositions);
        return userPositions;
    }
    catch(e) {
        console.log(e);
    }
}