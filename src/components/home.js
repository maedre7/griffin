import React from "react";
import Form from './form';
import Slider from './slider';
import ViewList from "./list";
import {fetchCurrentState} from "../graphql/request";
import {getPoolAddress} from "../utils/uniswap/utils";
import {enableMetamask} from "../utils/metamask";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token0: 'WETH',
            token1: 'USDT',
            feeTier: 3000,
            mainnet_state: {},
            optimism_state: {},
            polygon_state: {},
            selectedToken: '',
            amount: 1,
            ticks: [],
            loading: false
        }
    }

    componentDidMount() {
        enableMetamask();
    }

    toggleLoader = () => {
        this.setState((prevState) => ({
           loading: !prevState.loading
        }));
    }

    onChange = (key, val) => {
        this.setState(({
            [key]: val
        }));
    }

    getCurrentState = async() => {
        try{
            this.toggleLoader();
            const {token0, token1, feeTier} = this.state;
            const poolAddress_mainnet = getPoolAddress(token0, token1, feeTier, 'MAINNET');
            const poolAddress_optimism = getPoolAddress(token0, token1, feeTier, 'OPTIMISM');
            const poolAddress_polygon = getPoolAddress(token0, token1, feeTier, 'POLYGON');
            const mainnet_state = await fetchCurrentState(poolAddress_mainnet, 'MAINNET');
            const optimism_state = await fetchCurrentState(poolAddress_optimism, 'OPTIMISM');
            const polygon_state = await fetchCurrentState(poolAddress_polygon, 'POLYGON');

            console.log(mainnet_state.token0.symbol, optimism_state.token0.symbol, polygon_state.token0.symbol);
            console.log(mainnet_state.tick, optimism_state.tick, polygon_state.tick)
            console.log('Pools', poolAddress_mainnet, poolAddress_optimism, poolAddress_polygon);

            this.setState(({
                mainnet_state,
                optimism_state,
                polygon_state,
                selectedToken: token0
            }));
        }
        catch(e) {
            console.log(e);
        }
        this.toggleLoader();
    }

    render() {
        return (
            <div className="home">
                <div className="home-container-left">
                    <Form {...this.state} onChange={this.onChange} onSubmit={this.getCurrentState} />
                </div>
                {Object.keys(this.state.mainnet_state).length > 0 ?
                    <div className="home-container-right">
                        <Slider {...this.state} onChange={this.onChange}/>
                        <ViewList {...this.state} />
                    </div> :
                    <div className="home-description-container">
                        <span className="home-description">Find best yields on Uniswap</span>
                    </div>
                }
            </div>
        );
    }

}

export default Home;