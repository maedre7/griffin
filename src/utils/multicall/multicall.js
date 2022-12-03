import { aggregate } from '@makerdao/multicall';

const getConfig = (block) => {
    return {
        rpcUrl: 'https://nameless-old-wildflower.optimism.quiknode.pro/fe851690cd7c726301e231e4878b58aceb9a2824/',
        multicallAddress: '0xeAa6877139d436Dc6d1f75F3aF15B74662617B2C',
        block: block ? '0x' + block.toString(16) : 'latest'
    }
};

const multicall = async(calldata, block) => {
    try{
        const result = await aggregate(calldata, getConfig(block));
        return Promise.resolve(result.results.transformed);
    }
    catch(e){
        return Promise.reject(e);
    }
}

export default multicall;