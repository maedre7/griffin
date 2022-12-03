import View from "./view";

const Views = (props) => {

    let {mainnet_state, optimism_state, polygon_state, amount, ticks} = props;
    mainnet_state = {chainId: 1, network: 'MAINNET', ...mainnet_state};
    optimism_state = {chainId: 10, network: 'OPTIMISM', ...optimism_state};
    polygon_state = {chainId: 137, network: 'POLYGON', ...polygon_state};

    return(

        <div className="list">
            <View state={mainnet_state} amount={amount} ticks={ticks} currentToken={props.selectedToken} />
            <View state={optimism_state} amount={amount} ticks={ticks} currentToken={props.selectedToken} />
            <View state={polygon_state} amount={amount} ticks={ticks} currentToken={props.selectedToken} />
        </div>

    );

}

export default Views;