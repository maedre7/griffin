import { LiFiWidget } from '@lifi/widget';

const LiFiWidgetView = (props) => {

    console.log(props);

    let widgetConfig = {
        toChain: 137,
        toToken: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
        integrator: 'Mantis',
        containerStyle: {
            maxHeight: '580px',
            border: '1px solid rgb(234, 234, 234)',
            borderRadius: '16px',
            backgroundColor: 'red'
        },
        theme: {
            height: '',
            shape: {

            }
        },
        appearance: 'light',
        variant: 'expandable'
    };

    if(props.destToken.address){
        widgetConfig = {
            ...widgetConfig,
            toChain: props.destChainId,
            toToken: props.destToken.address
        }
    }

    return(
        <LiFiWidget config={widgetConfig} />
    );
}

export default LiFiWidgetView;