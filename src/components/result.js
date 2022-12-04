import Result from 'antd/lib/result';
import Button from "antd/lib/button";
import { useNavigate } from "react-router-dom";

const ResultView = (props) => {

    const _navigate = useNavigate();

    const navigate = () => {
        _navigate('/dashboard');
    }

    return(
        <Result
        status="success"
        title="Deposit successful"
        subTitle="You have successfully added liquidity to the WETH-USDT pool!"
        extra={[
            <Button type="primary" key="console" onClick={navigate}>Go to dashboard</Button>
        ]}
    /> );
}

export default ResultView;