import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import Tabs from 'antd/lib/tabs';
import Divider from "antd/lib/divider";
import Button from "antd/lib/button";
import {DoubleRightOutlined} from '@ant-design/icons';
import LiFiWidgetView from "./lifi";
import ResultView from './result';
import {getAccount, getBalances, sendTransaction} from "../utils/metamask";
import {fromDecimals, round} from "../utils/helper";
import {getTransactionCalldata} from "../utils/uniswap/liquidity";
import {tickToPrice} from "@uniswap/v3-sdk";

const customStyles = {
    content : {
        height                : '680px',
        width                 : '800px',
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        boxShadow             : '0 8px 12px 0 rgba(0,0,0,0.2)'
    },
    overlay: {
        zIndex: 2
    }
};

const ModalView = (props) => {

    const {pool, tickLower, tickUpper} = props.position;
    const {amount0, amount1} = props.position.mintAmounts;
    const {token0, token1} = pool;
    const decimalDelta = Math.abs(token0.decimals - token1.decimals);

    const [balances, setBalances] = useState(['0', '0']);
    const [showResult, setShowResult] = useState(false);
    const [activeKey, setActiveKey] = useState('1');

    const fetchBalances = () => {
        getAccount().then((account) => {
            getBalances([token0, token1], account, pool.chainId).then((balances) => {
                setBalances(balances);
                console.log(balances);
            });
        }).catch((e) => console.log(e));
    }

    useEffect(() => {
        fetchBalances();
    }, []);

    const onTabChange = (key) => {
        setActiveKey(key);
        if(key == "1"){
            fetchBalances();
        }
    }

    const validate = () => {
        let errors = {};
        const [balance0, balance1] = balances;
        if(balance0 < Number(amount0)){
            errors['token0'] = true;
        }
        if(balance1 < Number(amount1)){
            errors['token1'] = true;
        }
        return errors;
    }

    const onSubmit = async () => {
        try{
            //await enableMetamask();
            const account = await getAccount();
            const {calldata, value} = getTransactionCalldata(props.position, account);
            console.log(calldata, value);
            await sendTransaction(calldata, account);
        }
        catch(e){
            console.log(e);
        }
    }

    const errors = validate();

    return(
        <Modal
            id="modal"
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
            style={customStyles}
            ariaHideApp={false}
            contentLabel="Add Position"
        >
            {!showResult ?
                <Tabs defaultActiveKey="1" activeKey={activeKey} onChange={(key) => onTabChange(key)}>
                    <Tabs.TabPane tab="Deposit" key="1">
                        <div className="modal-main">
                            <div className="modal-container">
                                <div className="modal-header">
                                    <span>Mainnet</span>
                                    <Divider className="modal-divider" />
                                </div>
                                <div className="modal-box-container">
                                    <div className="modal-box">
                                        <span className="header-text">Deposit amount</span>
                                        <div className="modal-box-value-container">
                                            <span>{token0.symbol}</span>
                                            <span>{round(fromDecimals(amount0, token0.decimals),  5) + ' ' + token0.symbol}</span>
                                        </div>
                                        <div className="modal-box-value-container">
                                            <span>{token1.symbol}</span>
                                            <span>{round(fromDecimals(amount1, token1.decimals), 5) + ' ' + token1.symbol}</span>
                                        </div>
                                    </div>
                                    <div className="modal-box">
                                        <span className="header-text">Wallet balances</span>
                                        <div className="modal-box-value-container">
                                            <span>{token0.symbol}</span>
                                            <span>{round(fromDecimals(balances[0], token0.decimals), 5) + ' ' + token0.symbol}</span>
                                        </div>
                                        <div className="modal-box-value-container">
                                            <span>{token1.symbol}</span>
                                            <span>{round(fromDecimals(balances[1], token1.decimals), 5) + ' ' + token1.symbol}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-range-container">
                                    <p className="header-text">Price range:</p>
                                    <div className="modal-range-sub-container">
                                        <div className="modal-range">
                                            <span>Min Price</span>
                                            <span className="header-text">{round(tickToPrice(pool.token0, pool.token1, props.position.tickLower).toFixed(4))}</span>
                                            <span>{token0.symbol + '/' + token1.symbol}</span>
                                            <span>{}</span>
                                        </div>
                                        <DoubleRightOutlined className="modal-arrow" />
                                        <div className="modal-range">
                                            <span>Min Price</span>
                                            <span className="header-text">{round(tickToPrice(pool.token0, pool.token1, props.position.tickUpper).toFixed(4))}</span>
                                            <span>{token0.symbol + '/' + token1.symbol}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button className="modal-button" disabled={Object.keys(errors).length > 0} type="primary" onClick={onSubmit}>Deposit</Button>
                            </div>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Bridge" key="2">
                        <LiFiWidgetView destChainId={pool.chainId} destToken={'WETH'} />
                    </Tabs.TabPane>
                </Tabs> :
                <div className="modal-result-container">
                    <ResultView onClose={() => setShowResult(false)} />
                </div>
            }
        </Modal>
    );
}

export default ModalView;