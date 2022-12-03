import multicall from "../multicall/multicall";
import {getUserPositionCountCalldata, getUserTokensCalldata, getPositionsCalldata} from "../multicall/calldata";
import {getSymbol} from "../helper";

const fetchUserPositions = async(user) => {
    try{
        let calldata = getUserPositionCountCalldata(user);
        const {count} = await multicall(calldata);
        calldata = getUserTokensCalldata(user, count);
        const result = await multicall(calldata);
        const tokens = Object.values(result);
        calldata = getPositionsCalldata(tokens);
        const positions = await  multicall(calldata);
        delete positions['undefined'];

        const _positions = {};

        const keys = Object.keys(positions);
        keys.map((key) => {
           const [token, _key] = key.split('-');
           const value = positions[key];
           _positions[token] = {
               ..._positions[token],
               [_key]: value
           }
        });

        const userPositions = Object.keys(_positions).map((key) => {
           const value = _positions[key];
           const {token0, token1} = value;
           const symbol0 = 'USDC'; // getSymbol(token0);
            const symbol1 = 'WETH';  // getSymbol(token1);
           return {key, symbol0, symbol1, ...value};
        });

        console.log(userPositions);

        return userPositions;

    }
    catch(e){
        console.log(e);
    }
}

export default fetchUserPositions;