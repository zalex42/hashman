import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import * as actions from '~/scenes/Servers/actions';
import LoaderContainer from '~/components/Loader';
import Title from '~/components/Title';
import Paper from '~/components/Paper';
import { Table } from '~/components/Table';
import hashrate from '~/utils/hashrate';
import wallet from '~/utils/wallet';

@hot(module)
@connect((state) => ({
    servers: state.servers
}), actions)
export default class extends Component
{
    state = {
        update: null
    };

    async componentDidMount()
    {
        this.props.getServers();

        this.setState({ update: setInterval(() => {
            this.props.getServers();
        }, 5000) });
    }

    componentWillUnmount()
    {
        clearInterval(this.state.update);
    }

    getCoinsValue = () => {
        const coins = {};

        this.props.servers.entities.map((server) => {
            server.Coins.map((coin) => {
                if (!coins.hasOwnProperty(coin.Coin))
                    coins[coin.Coin] = {
                        coin: null,
                        hashrate: 0,
                        income: 0
                    };

                coins[coin.Coin].coin = coin.Coin;
                coins[coin.Coin].hashrate += coin.hashrate;
                coins[coin.Coin].income += coin.daylyIncome;
            });
        });

        const coinsArr = [];
        for (let coin in coins)
            coinsArr.push(coins[coin]);

        return coinsArr;
    };

    render()
    {
        const { servers } = this.props;

        return (
            <div>
                <Title>Прибыль</Title>
                <Paper title="Текущая прибыль">
                    <LoaderContainer loading={servers.entities.length === 0}>
                        <Table
                            columns={[
                                {
                                    label: 'Coin',
                                    index: 'coin'
                                },
                                {
                                    label: 'Хэшрейт',
                                    index: 'hashrate',
                                    render: (value) => hashrate(value)
                                },
                                {
                                    label: 'Прибыль',
                                    index: 'income',
                                    render: (value) => wallet(value)
                                }
                            ]}
                            dataSource={this.getCoinsValue()}
                            pagination={false}
                        />
                    </LoaderContainer>
                </Paper>
            </div>
        );
    }
}