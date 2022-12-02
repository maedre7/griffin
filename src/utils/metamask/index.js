import Web3 from 'web3';
import ERC20_ABI from '../../abi/ERC20_ABI.json';

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
            const network = await web3.eth.net.getNetworkType();
            if(network === 'rinkeby'){
                resolve();
            }
            else{
                reject();
            }
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

export const getBalances = (tokens, account) => {
    const promise = new Promise(async(resolve, reject) => {
        const balances = [];
        try{
            for(let token of tokens){
                let balance;
                if(token.symbol === 'WETH'){
                    balance = await web3.eth.getBalance(account);
                }
                else{
                    const tokenContract = new web3.eth.Contract(ERC20_ABI, token.address);
                    balance = await tokenContract.methods.balanceOf(account).call();
                }
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

export const sendTransaction = async (data, account) => {
    try{
        await web3.eth.sendTransaction({
            from: account,
            data
        });
        return;
    }
    catch(e){
        console.log(e);
    }
}