import {useState} from "react";
import Button from 'antd/lib/button';
import ModalView from "./modal";
import {getPoolInstance, computeTokenAmounts, getTransactionCalldata} from "../utils/uniswap/liquidity";
import {getEstimatedFee} from "../utils/uniswap/fee";
import {getPoolTicks} from "../utils/uniswap/utils";
import {round} from "../utils/helper";
import {CHAIN_TO_NETWORK, VOLUME} from "../config";

const View = (props) => {

    const [isOpen, toggleModal] = useState(false);

    const openModal = () => {
        toggleModal(true);
    }

    const closeModal = () => {
        toggleModal(false);
    }

    const {state, amount, ticks} = props;
    const pool = getPoolInstance(state);
    const {chainId, network, id, token0, token1, tick, feeTier} = state;
    const [tickLower, tickUpper] = ticks;

    let userPosition, token0Amount = 0, token1Amount = 0;

    if(amount && ticks[0]){
        const {position, amount0, amount1} = computeTokenAmounts(pool, tickLower, tickUpper, amount, props.currentToken);
        userPosition = position;
        token0Amount = amount0;
        token1Amount = amount1;
    }

    const allPoolTicks = getPoolTicks(chainId);
    const poolTicks = allPoolTicks[id];

    let fee = 0;

    if(tickLower){
        const avgVol = VOLUME[CHAIN_TO_NETWORK[pool.chainId]];
        fee = getEstimatedFee(tickLower, tickUpper, token0Amount, token1Amount, pool.token0, pool.token1, poolTicks, tick, avgVol, feeTier);
    }

    const onClick = () => {
        openModal(true);
    }

    return(

        <div className="view">
            <div className="view-header">
                <img src={`/icons/${network.toLowerCase()}.png`} />
            </div>
            <div className="view-top-container">
                <div className="view-amount-container">
                    <span>{token0Amount + ' ' + token0.symbol}</span>
                </div>
                <div className="view-amount-container">
                    <span>{token1Amount + ' ' + token1.symbol}</span>
                </div>
            </div>
            <div className="view-bottom-container">
                <div className="view-fee-container">
                    <span className="header-text">24hr fee</span>
                    <span>${round(fee, 3)}</span>
                </div>
                <div className="view-fee-container">
                    <span className="header-text">Monthly fee</span>
                    <span>${round(fee * 30, 3)}</span>
                </div>
                <div className="view-fee-container">
                    <span className="header-text">Yearly fee</span>
                    <span>${round(fee * 365, 3)}</span>
                </div>
                <Button disabled={token0Amount == 0} onClick={onClick}>Deposit</Button>
            </div>
            {isOpen && <ModalView isOpen={isOpen} closeModal={closeModal} position={userPosition} amount0={token0Amount} amount1={token1Amount} />}
        </div>

    );

}

export default View;