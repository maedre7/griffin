import Select from "antd/lib/select";
import Input from "antd/lib/input-number";
import Slider from "antd/lib/slider";
import {nearestUsableTick, tickToPrice} from "@uniswap/v3-sdk";
import {round} from "../utils/helper";
import {TICK_SPACES} from "../config";
import React from "react";
import {getPoolInstance} from "../utils/uniswap/liquidity";

const SliderView = (props) => {

    const tickSpace = TICK_SPACES[props.feeTier.toString()];

    const pool = getPoolInstance({...props.mainnet_state, chainId: 1});

    const {token0, token1, tick} = props.mainnet_state;
    const {symbol: symbol0, decimals: decimals0} = token0;
    const {symbol: symbol1, decimals: decimals1} = token1;

    const options = [
        {
            value: symbol0,
            label: symbol0
        },
        {
            value: symbol1,
            label: symbol1
        }
    ];

    const nearestTick = nearestUsableTick(Number(tick), tickSpace);

    const min = nearestTick - tickSpace * 200;
    const max = nearestTick + tickSpace * 200;
    const step = tickSpace;

    const defaultValue = [nearestTick - tickSpace * 40, nearestTick + tickSpace * 40];

    let baseToken, quoteToken;

    if(props.selectedToken == symbol0){
        baseToken = pool.token0;
        quoteToken = pool.token1;
    }
    else{
        baseToken = pool.token1;
        quoteToken = pool.token0;
    }

    const priceCurrent = tickToPrice(baseToken, quoteToken, Number(tick)).toFixed(4);

    let priceLower = 0, priceUpper = 0;

    if(props.ticks[0]){
        priceLower = tickToPrice(baseToken, quoteToken, props.ticks[0]).toFixed(4);
        priceUpper = tickToPrice(baseToken, quoteToken, props.ticks[1]).toFixed(4);
    }

    return (
        <div className="slider-container">
            <div className="slider-dropdown-container">
                <span className="header-text">Select asset:</span>
                <Select
                    size="large"
                    defaultValue={props.selectedToken}
                    style={{width: 120}}
                    onChange={(val) => props.onChange('selectedToken', val)}
                    options={options} />
            </div>
            <div className="slider-input-container">
                <span className="header-text">Deposit Amount (in {props.selectedToken}):</span>
                <Input className="slider-input" placeholder={"Amount"} value={props.amount}
                   onChange={(val) => props.onChange('amount', val)} />
            </div>
            <div className="slider-sub-container">
                <span className="header-text">Select price range: </span>
                <Slider range defaultValue={defaultValue} onChange={(val) => props.onChange('ticks', val)}
                    min={min} max={max} step={step} />
                <div className="slider-value-container">
                    <p>{round(priceLower, 5) + ' ' + (props.selectedToken == symbol0 ? symbol1 : symbol0)}</p>
                    <p>{round(priceUpper, 5) + ' ' + (props.selectedToken == symbol0 ? symbol1 : symbol0)}</p>
                </div>
                <div className="slider-price-container">
                    <span>Current price:</span>
                    <p className="header-text">{priceCurrent}</p>
                </div>
            </div>
        </div>
    );
}

export default SliderView;