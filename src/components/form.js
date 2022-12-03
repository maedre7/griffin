import React from 'react';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import {getAssets} from "../utils/helper";
import { CaretDownOutlined } from "@ant-design/icons";

class Form extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {

        const tokens = getAssets();

        const {token0, token1, feeTier} = this.props;

        return (
            <div className="form">
                <div className="dropdown-container">
                    <div className="flex-col">
                        <span className="header-text">Select Pair</span>
                        <div className="dropdown-sub-container">
                            <Select
                                size="large"
                                defaultValue={token0}
                                style={{width: 120}}
                                onChange={(val) => this.props.onChange('token0', val)}
                                options={tokens}
                                suffixIcon={<CaretDownOutlined />} />
                            <Select
                                size="large"
                                defaultValue={token1}
                                style={{width: 120}}
                                onChange={(val) => this.props.onChange('token1', val)}
                                options={tokens}
                                suffixIcon={<CaretDownOutlined />} />
                        </div>
                    </div>
                </div>
                <div className="fee-tier-container">
                    <span className="header-text">Select Fee Tier</span>
                    <div className="fee-tier-sub-container">
                        <div className={"fee-tier " + (feeTier == 100 && "select")} onClick={() => this.props.onChange('feeTier', 100)}>
                            <span><b>0.01%</b></span>
                            <p>Best for very stable pairs</p>
                        </div>
                        <div className={"fee-tier " + (feeTier == 500 && "select")} onClick={() => this.props.onChange('feeTier', 500)}>
                            <span><b>0.05%</b></span>
                            <p>Best for stable pairs</p>
                        </div>
                        <div className={"fee-tier " + (feeTier == 3000 && "select")} onClick={() => this.props.onChange('feeTier', 3000)}>
                            <span><b>0.3%</b></span>
                            <p>Best for most pairs</p>
                        </div>
                        <div className={"fee-tier " + (feeTier == 10000 && "select")} onClick={() => this.props.onChange('feeTier', 10000)}>
                            <span><b>1%</b></span>
                            <p>Best for exotic pairs</p>
                        </div>
                    </div>
                </div>
                <Button size="large" type={"primary"} loading={this.props.loading} onClick={this.props.onSubmit}>Submit</Button>
            </div>
        );
    }
}

export default Form;