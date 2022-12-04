import bn from 'bignumber.js';
import {tickToPrice} from "@uniswap/v3-sdk";

bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });

const Q96 = new bn(2).pow(96);

const getLiquidityFromTick = (poolTicks, tick) => {
    let liquidity = new bn(0);
    for (let i = 0; i < poolTicks.length - 1; ++i) {
        liquidity = liquidity.plus(new bn(poolTicks[i].liquidityNet));

        const lowerTick = Number(poolTicks[i].tickIdx);
        const upperTick = Number(poolTicks[i + 1]?.tickIdx);

        if (lowerTick <= tick && tick <= upperTick) {
            break;
        }
    }

    return liquidity;
};

const getLiquidityForAmount0 = (
    sqrtRatioAX96,
    sqrtRatioBX96,
    amount0
) => {
    // amount0 * (sqrt(upper) * sqrt(lower)) / (sqrt(upper) - sqrt(lower))
    const intermediate = mulDiv(sqrtRatioBX96, sqrtRatioAX96, Q96);
    return mulDiv(amount0, intermediate, sqrtRatioBX96.minus(sqrtRatioAX96));
};

const getLiquidityForAmount1 = (
    sqrtRatioAX96,
    sqrtRatioBX96,
    amount1
) => {
    // amount1 / (sqrt(upper) - sqrt(lower))
    return mulDiv(amount1, Q96, sqrtRatioBX96.minus(sqrtRatioAX96));
};

const getSqrtPriceX96 = (price, token0Decimal, token1Decimal) => {
    const token0 = expandDecimals(price, token0Decimal);
    const token1 = expandDecimals(1, token1Decimal);
    return token0.div(token1).sqrt().multipliedBy(Q96);
};

const getLiquidityDelta = (
    P,
    lowerP,
    upperP,
    amount0,
    amount1,
    token0Decimal,
    token1Decimal
) => {
    const amt0 = expandDecimals(amount0, token1Decimal);
    const amt1 = expandDecimals(amount1, token0Decimal);

    const sqrtRatioX96 = getSqrtPriceX96(P, token0Decimal, token1Decimal);
    const sqrtRatioAX96 = getSqrtPriceX96(lowerP, token0Decimal, token1Decimal);
    const sqrtRatioBX96 = getSqrtPriceX96(upperP, token0Decimal, token1Decimal);

    let liquidity;
    if (sqrtRatioX96.lte(sqrtRatioAX96)) {
        liquidity = getLiquidityForAmount0(sqrtRatioAX96, sqrtRatioBX96, amt0);
    } else if (sqrtRatioX96.lt(sqrtRatioBX96)) {
        const liquidity0 = getLiquidityForAmount0(
            sqrtRatioX96,
            sqrtRatioBX96,
            amt0
        );
        const liquidity1 = getLiquidityForAmount1(
            sqrtRatioAX96,
            sqrtRatioX96,
            amt1
        );

        liquidity = bn.min(liquidity0, liquidity1);
    } else {
        liquidity = getLiquidityForAmount1(sqrtRatioAX96, sqrtRatioBX96, amt1);
    }

    return liquidity;
};

const estimateFee = (
    liquidityDelta,
    liquidity,
    volume24H,
    feeTier
) => {
    const feeTierPercentage = getFeeTierPercentage(feeTier);
    const liquidityPercentage = liquidityDelta
        .div(liquidity.plus(liquidityDelta))
        .toNumber();

    return feeTierPercentage * volume24H * liquidityPercentage;
};

const getFeeTierPercentage = (tier) => {
    return tier / 1000000;
};

const encodeSqrtPriceX96 = (price) => {
    return new bn(price).sqrt().multipliedBy(Q96).integerValue(3);
};

const expandDecimals = (n, exp) => {
    return new bn(n).multipliedBy(new bn(10).pow(exp));
};

const mulDiv = (a, b, multiplier) => {
    return a.multipliedBy(b).div(multiplier);
};

export const getEstimatedFee = (
    tickLower,
    tickUpper,
    amount0,
    amount1,
    Token0,
    Token1,
    poolTicks,
    currentTick,
    avgVol,
    feeTier
) => {
    const P = tickToPrice(Token0, Token1, Number(currentTick)).toFixed(4);
    const lowerP = tickToPrice(Token0, Token1, tickLower).toFixed(4);
    const upperP = tickToPrice(Token0, Token1, tickUpper).toFixed(4);
    const liquidityDelta = getLiquidityDelta(P, lowerP, upperP, amount0, amount1, Token0.decimals, Token1.decimals);
    const liquidity = getLiquidityFromTick(poolTicks, currentTick);
    const fee = estimateFee(liquidityDelta, liquidity, avgVol, feeTier);
    return fee;
}