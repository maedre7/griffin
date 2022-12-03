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
            title="Successfully Purchased Cloud Server ECS!"
            subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            extra={[
                <Button type="primary" key="console" onClick={navigate}>Go to dashboard</Button>
            ]}
        /> );
}

export default ResultView;