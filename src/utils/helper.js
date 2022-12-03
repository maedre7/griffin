import {ethers} from "ethers";
import _ from 'lodash';
import {ASSETS, TOKENS} from "../config";

export const toBN = (value) => {
    return ethers.BigNumber.from(value);
}

export const fromWei = (amount) => {
    return ethers.utils.formatEther(amount);
}

export const toWei = (amount) => {
    return ethers.utils.parseEther(amount.toString());
}

export const fromDecimals = (value, decimals) => {
    return ethers.utils.formatUnits(value.toString(), Number(decimals));
}

export const toDecimals = (value, decimals) => {
    return ethers.utils.parseUnits(value.toString(), Number(decimals));
}

export const round = (amount, precision) => {
    return Number(Number(amount).toFixed(precision || 3));
}

export const getSymbol = (address, chain) => {
    const _TOKENS = TOKENS[chain];
    const mapping = _.invert(_TOKENS);
    return mapping[address.toLowerCase()];
}

export const getAssets = () => {
    return ASSETS.map((symbol) => {
        return {
            value: symbol,
            label: symbol
        }
    });
}