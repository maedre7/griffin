export const tickToPrice = (tick, decimalDelta) => {
    const base = 1.0001;
    return (base ** tick) / (10 ** Math.abs(decimalDelta)).toString();
}

export const getPriceRange = (tickLower, tickUpper, decimalDelta) => {
    const priceLower = tickToPrice(tickLower, decimalDelta);
    const priceUpper = tickToPrice(tickUpper, decimalDelta);
    return {priceLower, priceUpper};
}