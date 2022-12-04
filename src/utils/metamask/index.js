import Web3 from 'web3';
import ERC20_ABI from '../../abi/ERC20_ABI.json';
import {CHAIN_TO_NETWORK, PROTOCOL} from "../../config";
import {PROVIDERS} from "./providers";

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

export const enableMetamask = () => {
    const promise = new Promise(async(resolve, reject) => {
        try{
            await window.ethereum.enable();
            resolve();
        }
        catch(e){
            reject(e);
        }
    });
    return promise;
}

export const getNetwork = () => {
    const promise = new Promise(async(resolve, reject) => {
        try{
            let chainId = await window.ethereum.request({
                method: 'eth_chainId',
            });
            chainId = parseInt(chainId, 16);
            const network = CHAIN_TO_NETWORK[chainId.toString()];
            resolve(network);
        }
        catch(e){
            reject(e);
        }
    });
    return promise;
}

export const getAccount = (args) => {
    const promise = new Promise(async(resolve, reject) => {
        try{
            const result = await web3.eth.getAccounts();
            resolve(result[0]);
        }
        catch(e){
            reject(e);
        }
    });
    return promise;
}

export const getBalances = (tokens, account, chainID) => {
    const promise = new Promise(async(resolve, reject) => {

        const providerUrl = PROVIDERS[CHAIN_TO_NETWORK[chainID]];
        const _web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

        const balances = [];
        try{
            for(let token of tokens){
                /*if(token.symbol === 'WETH'){
                    balance = await _web3.eth.getBalance(account);
                }*/
                const tokenContract = new _web3.eth.Contract(ERC20_ABI, token.address);
                const balance = await tokenContract.methods.balanceOf(account).call();
                balances.push(balance);
            };
            resolve(balances);
        }
        catch(e){
            reject(e);
        }
    });
    return promise;
}

export const sendTransaction = async (data, account, func) => {
    try{
        web3.eth.sendTransaction({
            from: account,
            to: PROTOCOL.NFT_POSITION_MANAGER,
            data
        }).on('confirmation', () => {
            func(true);
        }).on('error', (e) => console.log(e));
    }
    catch(e){
        console.log(e);
    }
}