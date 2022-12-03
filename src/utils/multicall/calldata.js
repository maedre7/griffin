import {PROTOCOL} from "../../config";

export const getUserPositionCountCalldata = (user) => {
    return {
        target: PROTOCOL.NFT_POSITION_MANAGER,
        call: ['balanceOf(address)(uint256)', user],
        returns: [['count', val => val.toString()]]
    }
}

export const getUserTokensCalldata = (user, count) => {
    const calldata = [];
    for(let i=0;i<count;i++){
        calldata.push({
           target: PROTOCOL.NFT_POSITION_MANAGER,
           call: ['tokenOfOwnerByIndex(address,uint256)(uint256)', user, i],
           returns: [[`token${i}`, val => val.toString()]]
        });
    }
    return calldata;
}

export const getPositionsCalldata = (tokens) => {
    return tokens.map((token) => {
        return {
            target: PROTOCOL.NFT_POSITION_MANAGER,
            call: ['positions(uint256)(uint96,address,address,address,uint24,int24,int24,uint128,uint256,uint256,uint128,uint128)', token],
            returns: [[], [], [`${token}-token0`], [`${token}-token1`], [`${token}-fee`], [`${token}-tickLower`], [`${token}-tickUpper`], [`${token}-liquidity`, val => val.toString()], [], [], [], []]
        };
    });
}