import { LiFiWidget } from '@lifi/widget';

const LiFiWidgetView = (props) => {

    const widgetConfig = {
        toToken: props.destToken.address,
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
        appearance: 'light'
    };

    return(
        <LiFiWidget config={widgetConfig} />
    );
}

export default LiFiWidgetView;