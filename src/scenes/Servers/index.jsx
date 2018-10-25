import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ResponsiveContainer, LineChart, BarChart, Line, Bar, Tooltip } from 'recharts';
import moment from 'moment'
import { rgba } from 'polished';

import temperature from '~/utils/temperature';
import hashrate from '~/utils/hashrate';
import wallet from '~/utils/wallet';
import getClrChartTemper from '~/utils/getClrChartTemper';
import theme from '~/theme';

import LoaderContainer from '~/components/Loader';
import Title from '~/components/Title';
import Paper from '~/components/Paper';
import { Table } from '~/components/Table';
import Tag, { Group } from '~/components/Tag';
import Tabs from '~/components/Tabs';
import { Row, Col } from '~/components/Grid';
import * as ToolTip from '~/components/ToolTip';
import EventInformer from '~/components/EventInformer';
import ChartTemper from '~/components/ChartTemper';

import * as actions from './actions';


const TooltipStability = (props) => (
    <ToolTip.Container>
        { props.payload && props.payload.length && props.payload.length > 0 ? (
            <ToolTip.Content>
                <ToolTip.Date>{ moment.utc(props.payload[0].payload.date).local().format('L') }</ToolTip.Date>
                { props.payload.map((item, index) => (
                    <ToolTip.Item key={index} color={item.color}>
                        <ToolTip.Name>{ `${item.name === 'uptime' ? 'Работа' : 'Простой'}` }</ToolTip.Name>
                        <ToolTip.Text>{ `${item.value} % (${index === 0 ? props.payload[0].payload.income : props.payload[0].payload.outcome} $)` }</ToolTip.Text>
                    </ToolTip.Item>
                )) }
            </ToolTip.Content>
        ) : null }
    </ToolTip.Container>
);

const TooltipHashrate = (props) => (
    <ToolTip.Container>
        { props.payload && props.payload.length && props.payload.length > 0 ? (
            <ToolTip.Content>
                <ToolTip.Date>{ moment.utc(props.payload[0].payload.date).local().format('L LT') }</ToolTip.Date>
                { props.payload.map((item, index) => (
                    <ToolTip.Item key={index} color={item.color}>
                        <ToolTip.Text>{ item.value } { item.payload.postfix }</ToolTip.Text>
                    </ToolTip.Item>
                )) }
            </ToolTip.Content>
        ) : null }
    </ToolTip.Container>
);

@hot(module)
@connect((state) => ({
    servers: state.servers,
    auth: state.auth
}), actions)
@withRouter
export default class extends Component
{
    state = {
        update: null,
		activeChart: null,
		showCharts: true
    };

    async componentDidMount()
    {
        this.props.getServers();
        await this.props.getCharts();

        if (this.props.servers.error.message === 'NOT DATA') this.setState({ showCharts: false });

        if (this.props.auth.entities.authorized) {
            this.setState({ update: setInterval(() => {
                this.props.getServers();
                this.props.getCharts();
            }, 5000) });
        }
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

    getInfo = () => {
        const info = {
            RigsTotal: 0,
            RigsOnline: 0,
            RigsWarning: 0,
            RigsError: 0,
            RigsOffline: 0,
        };

        this.props.servers.entities.map((server) => {
            info.RigsTotal += server.RigsTotal;
            info.RigsOnline += server.RigsOnline;
            info.RigsWarning += server.RigsWarning;
            info.RigsError += server.RigsError;
            info.RigsOffline += server.RigsOffline;
        });

        return info;
    };

    hashrateCharts = () => {
        let charts = [];
        Object.keys(this.props.servers.charts.Hashrate).map((chart) => charts.push({
            label: chart,
            index: chart,
            content: (
                <ResponsiveContainer width="100%" height={80}>
                    <LineChart data={this.props.servers.charts.Hashrate[chart]}>
                        <Tooltip content={<TooltipHashrate />} />
                        <Line dot={false} type='monotone' dataKey='value' strokeWidth={2} stroke={this.state.activeChart === 'hashrate' ? theme.notifications.primary : theme.notifications.hidden} />
                    </LineChart>
                </ResponsiveContainer>
            )
        }));
        return charts;
    };

    getCurrentTemperature = () => {
        let arr = [];

        if (Object.keys(this.props.servers.charts).length > 0)
            Object.keys(this.props.servers.charts.currentTemperatures).map((item, ind) =>
                arr.push(<Tag 
                            color={this.state.activeChart === 'temperature' ? getClrChartTemper(item) :  getClrChartTemper()} 
                            key={ind}>
                            { item }: { this.props.servers.charts.currentTemperatures[item] }
                         </Tag>)
            );

        return arr;
    };

    render()
    {
        const { servers } = this.props;
        return (
            <div>
                <Title>Контрольная панель</Title>
				{
					this.state.showCharts ?
				<Row>
                    <Col xs={12} md={6} lg={3}>
                        <Paper 
                            isBlankData={servers.charts && servers.charts.Stability && Object.keys(servers.charts.Stability).length === 0}
                            title="Стабильность" 
                            loading={Object.keys(servers.charts).length === 0} 
                            subes={[
                                <div><Tag type={this.state.activeChart === 'stability' ? 'primary' : 'hidden'} key={1}>Всего: {this.getInfo().RigsTotal}</Tag></div>,
                                <Tag type={this.state.activeChart === 'stability' ? 'success' : 'hidden'} key={2}>Онлайн: {this.getInfo().RigsOnline}</Tag>,
                                <Tag type={this.getInfo().RigsError > 0 || this.state.activeChart === 'stability' ? 'error' : 'hidden'} key={4}>Нерабочие: {this.getInfo().RigsError}</Tag>,
                            ]} 
                            onMouseEnter={(e) => this.setState({ activeChart: 'stability' })} 
                            onMouseLeave={() => this.setState({ activeChart: null })}>
                                <ResponsiveContainer width="100%" height={110}>
                                    <BarChart data={servers.charts.Stability}>
                                        <Tooltip content={<TooltipStability />} />
                                        <Bar dataKey="uptime" stackId="a" fill={this.state.activeChart === 'stability' ? theme.notifications.success : rgba(theme.notifications.hidden, 0.6)} />
                                        <Bar dataKey="downtime" stackId="a" fill={this.state.activeChart === 'stability' ? theme.notifications.error : theme.notifications.hidden} />
                                    </BarChart>
                                </ResponsiveContainer>
                        </Paper>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
						<Paper
                            isBlankData={ servers.charts && servers.charts.currentHashrate && Object.keys(servers.charts.currentHashrate).length === 0 }
                            title="Хэшрейт" 
                            loading={Object.keys(servers.charts).length === 0} 
                            onMouseEnter={(e) => this.setState({ activeChart: 'hashrate' })} 
                            onMouseLeave={() => this.setState({ activeChart: null })} 
                            subes={ Object.keys(servers.charts).length !== 0 
                                        ? Object.keys(servers.charts.currentHashrate).map((current) => 
                                            <Tag type="hidden">{ `${current}: ${hashrate(servers.charts.currentHashrate[current])}` }</Tag>) 
                                        : null }>
                                { Object.keys(servers.charts).length > 0 ? <Tabs items={this.hashrateCharts()} /> : null }
                        </Paper>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <Paper 
                            isBlankData={ servers.charts && servers.charts.Temperature && servers.charts.Temperature.length === 0} 
                            title="Температура" 
                            loading={Object.keys(servers.charts).length === 0} 
                            subes={this.getCurrentTemperature()} 
                            onMouseEnter={(e) => this.setState({ activeChart: 'temperature' })} 
                            onMouseLeave={() => this.setState({ activeChart: null })}
                            >
							<ChartTemper items={servers.charts.Temperature} active={this.state.activeChart === 'temperature'}></ChartTemper> 
                        </Paper>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <EventInformer items={servers.charts.Events} onCloseModal={this.props.getCharts}></EventInformer>
                    </Col>
                </Row>
				: null }
                <Paper title="Фермы" isBlankData={servers.entities.length === 0}>
                    <LoaderContainer loading={servers.pending.loading} once={true}>
                        {
                            servers.entities.length > 0 
                                ? <Table
                                    columns={[
                                        {
                                            label: 'Сервер',
                                            index: 'ServerName',
                                            sorter: true, compare: (a, b) => a.ServerName.localeCompare(b.ServerName),
                                            render: (value, record) => (
                                                <div>
                                                    { value } <Tag type="hidden">({ record.RigsTotal })</Tag>
                                                </div>
                                            )
                                        },
                                        {
                                            label: 'Температура (GPU)',
                                            index: 'GPUTemp',
                                            render: (value, record) => value === 0 ? '---' : <Tag type={record.GPUTempT}>{ temperature(value) }</Tag>
                                        },
                                        {
                                            label: 'Температура (ASIC)',
                                            index: 'ASICTemp',
                                            render: (value, record) => value === 0 ? '---' : <Tag type={record.ASICTempT}>{ temperature(value) }</Tag>
                                        },
                                        {
                                            label: 'В помещении',
                                            index: 'Temperature',
                                            render: (value) => value === 0 ? '---' : <Tag>{ temperature(value) }</Tag>
                                        },
                                        {
                                            label: 'Вентиляция',
                                            index: 'CoolFan',
                                            render: (value) => value < 0 ? '---' : <Tag>{ `${value} %` }</Tag>
                                        },
                                        {
                                            label: 'Хэшрейт',
                                            index: 'Hashrate',
                                            render: (value, record) => <Group>{record.Coins.map((coin, index) => (<Tag type={coin.hashrateT} key={index}>{coin.Coin}: {hashrate(coin.hashrate)}</Tag>))}</Group>
                                        },
                                        {
                                            label: 'Доходность',
                                            index: 'Income',
                                            render: (value, record) => wallet(record.Coins.reduce((accumulator, value) => accumulator + value.daylyIncome, 0))
                                        },
                                        {
                                            label: 'Статус',
                                            index: 'RigsError',
                                            render: (value, record) => (
                                                <div>
                                                    { record.RigsError === 0 ? <Tag type="success">ОК</Tag> : <Tag type="error"> Нерабочие: { record.RigsError } </Tag> }
                                                </div>
        
                                            )
                                        },
                                    ]}
                                    dataSource={servers.entities}
                                    onRowClick={(record) => this.props.history.push(`/rigs/${record.ServerID}`)}
                                  />
                                : null
                        }

                    </LoaderContainer>
                </Paper>
            </div>
        );
    }
}