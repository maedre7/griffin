import {Pool, Position, NonfungiblePositionManager} from '@uniswap/v3-sdk';
import {Token, Percent} from '@uniswap/sdk-core';
import {round, toDecimals} from "../helper";

export const getPoolInstance = (poolData) => {

    const {chainId, token0, token1, feeTier, sqrtPrice, liquidity, tick} = poolData;

    const Token0 = new Token(chainId, token0.id, Number(token0.decimals), token0.symbol);
    const Token1 = new Token(chainId, token1.id, Number(token1.decimals), token1.symbol);

    const pool = new Pool(Token0, Token1, Number(feeTier), sqrtPrice, liquidity, Number(tick));

    return pool;
}

export const computeTokenAmounts = (pool, tickLower, tickUpper, amount, currentToken) => {

    const decimal0 = pool.token0.decimals;
    const decimal1 = pool.token1.decimals;

    let position;

    if(currentToken == pool.token0.symbol){
        position = Position.fromAmount0({
            pool,
            tickLower,
            tickUpper,
            amount0: toDecimals(amount, decimal0),
            useFullPrecision: true
        });
    }
    else{
        position = Position.fromAmount1({
            pool,
            tickLower,
            tickUpper,
            amount1: toDecimals(amount, decimal1),
            useFullPrecision: true
        });
    }

    let {amount0, amount1} = position;

    amount0 = round(amount0.toExact(), 5);
    amount1 = round(amount1.toExact(), 5);

    return {position, amount0, amount1};
}

export const getTransactionCalldata = (position, account) => {
    const deadline = Math.floor(Date.now() / 1000) + 1000;
    const { calldata, value } = NonfungiblePositionManager.addCallParameters(position, {
        slippageTolerance: new Percent(50, 10_000),
        recipient: account,
        deadline: deadline,
    });
    return {calldata, value};
}