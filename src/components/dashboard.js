import {useState, useEffect} from "react";
import Table from 'antd/lib/table';
import Button from "antd/lib/button";
import {fetchUserPositions} from "../graphql/request";
import {round} from "../utils/helper";
import {S3_URL} from "../config";
import {getAccount, getNetwork} from "../utils/metamask";

const Dashboard = (props) => {

    const [positions, setPositions] = useState([]);

    useEffect(() => {
        getAccount().then((account) => {
            getNetwork().then((network) => {
                fetchUserPositions(account, network).then((positions) => {
                    setPositions(positions);
                });
            });
        })
        .catch((e) => {
            console.log(e);
        });
    }, []);

    const columns = [
        {
            title: 'Pool',
            dataIndex: 'pool',
            key: 'pool',
            render: (val, item) => (
                <span className="table-icon-container">
                    <span>
                        <img className="table-icon" src={`${S3_URL}/${item.symbol0.toLowerCase()}.png`} />
                        <img className="table-icon" src={`${S3_URL}/${item.symbol1.toLowerCase()}.png`} />
                    </span>
                    <span><b>{item.symbol0}-{item.symbol1}</b></span>
                </span>
            )
        },
        {
            title: 'FeeTier',
            dataIndex: 'feeTier',
            key: 'feeTier',
            render: (val) => (
                <span><b>{val / 10000}%</b></span>
            )
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            key: 'balance',
            render: (val, item) => {
                return(
                    <div className="table-balance-container">
                        <span>
                            <img className="table-balance-icon" src={`${S3_URL}/${item.symbol0.toLowerCase()}.png`} />
                            {round(item.amount0)}
                        </span>
                        <span>
                            <img className="table-balance-icon" src={`${S3_URL}/${item.symbol1.toLowerCase()}.png`} />
                            {round(item.amount1)}
                        </span>
                    </div>
                );
            }
        },
        {
            title: 'Range',
            dataIndex: 'range',
            key: 'range',
            render: (val, item) => (
                <span>{round(item.tickLower)} -> {round(item.tickUpper)}</span>
            )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: () => (
                <div className="table-actions-container">
                    <Button type="primary">Add Liquidity</Button>
                    <Button>Remove Liquidity</Button>
                </div>
            )
        }
    ];

    return(

        <div className="dashboard">
            <div className="dashboard-header">
                <h4>Your Positions</h4>
            </div>
            <div className="dashboard-container">
                <Table dataSource={positions} columns={columns} />
            </div>
        </div>

    );

}

export default Dashboard;