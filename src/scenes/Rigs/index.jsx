import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ResponsiveContainer, LineChart, BarChart, Line, Bar, Tooltip } from 'recharts';
import moment from "moment/moment";

import { rgba } from 'polished';
import renderHTML from 'react-render-html';

import { Row, Col } from '~/components/Grid';
import LoaderContainer from '~/components/Loader';
import Tabs from '~/components/Tabs';
import Tag from '~/components/Tag';
import Title from '~/components/Title';
import Paper from '~/components/Paper';
import * as ToolTip from '~/components/ToolTip';
import EventInformer from '~/components/EventInformer';
import ChartTemper from '~/components/ChartTemper';
import RigsTable from './Table';

import * as serversActions from '~/scenes/Servers/actions';
import * as actions from './actions';
import hashrate from '~/utils/hashrate';
import getClrChartTemper from '~/utils/getClrChartTemper';
import theme from '~/theme';



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
    rigs: state.rigs
}), { ...actions, ...serversActions })
@withRouter
export default class extends Component
{
    state = {
        update: null,
        update2: null,
		activeChart: null,
        showCharts: true,
        currServId: null
    };

    componentDidMount()
    {
        this.props.getServers().then(() => {
            this.setState({
                currServId: this.props.match.params.id
//                currServId: global.ServerID
                //currServId: this.props.servers.entities.ServerID
            })
        });
    //    if (this.state.currServId) {
      //      this.props.getRigs(this.state.currServId);
        //    this.props.getCharts2(this.state.currServId, true);
        //}
    this.setState({ update: setInterval(() => {
            this.props.getServers();
            if (this.state.currServId) {
                this.props.getRigs(this.state.currServId);
            }
        }, 10000) });
        this.setState({ update2: setInterval(() => {
            if (this.state.currServId) {
                this.props.getCharts2(this.state.currServId, false, this.props.rigs.lastIDEvents);
            }
        }, 15000) });
    }

    setShowCharts = () => this.setState({ showCharts: false });

    componentWillUnmount()
    {
        clearInterval(this.state.update);
        clearInterval(this.state.update2);
    }

    getItems = () => {
    //    clearInterval(this.state.update);
        return this.props.servers.entities.map((server) => ({
            label: renderHTML(`
                <div>${server.ServerName}</div>
                <div class="fs-10-px">Всего: ${server.RigsTotal}</div>
                <div class="fs-10-px" 
                     style="color: ${server.RigsError > 0 ? '#ff6c41' : ''}">
                     Не работают: ${server.RigsError}</div>
            `),
            index: server.ServerID,
            content: <RigsTable showCharts={this.setShowCharts} server={server} history={this.props.history} />
        }));
    };

    hashrateCharts
		= () => {
        let charts = [];
        Object.keys(this.props.rigs.charts.Hashrate).map((chart) => charts.push({
            label: `${chart}: ${ typeof this.props.rigs.charts.currentHashrate[chart] === 'undefined' ? 0 : hashrate(this.props.rigs.charts.currentHashrate[chart])}`,
            index: chart,
            content: (
                <ResponsiveContainer width="100%" height={80}>
                    <LineChart data={this.props.rigs.charts.Hashrate[chart]}>
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

        if (Object.keys(this.props.rigs.charts).length > 0)
            Object.keys(this.props.rigs.charts.currentTemperatures).map((item, ind) =>
                arr.push(<Tag 
                            color={this.state.activeChart === 'temperature' ? getClrChartTemper(item) :  getClrChartTemper()} 
                            key={ind}>{ item }: { this.props.rigs.charts.currentTemperatures[item] }
                         </Tag>)
            );

        return arr;
    };

    onTab = ind => {
        this.props.rigsClear();
        this.setState({
            currServId: ind
        });
        this.props.history.push(`/rigs/${ind}`);
    }

    render()
    {
        const { servers, rigs, match } = this.props;
        return (
            <div>
                <Title>Устройства</Title>
				{this.state.showCharts ? <Row>
                    <Col xs={12} md={6} lg={3}>
                        <Paper
                            isBlankData={rigs.charts && rigs.charts.Stability && rigs.charts.Stability.length === 0}
                            title="Стабильность" 
                            loading={Object.keys(rigs.charts).length === 0} 
                            onMouseEnter={(e) => this.setState({ activeChart: 'stability' })} 
                            onMouseLeave={() => this.setState({ activeChart: null })}>
                                <ResponsiveContainer width="100%" height={135}>
                                    <BarChart data={rigs.charts.Stability}>
                                        <Tooltip content={<TooltipStability />} />
                                        <Bar dataKey="uptime" stackId="a" fill={this.state.activeChart === 'stability' ? theme.notifications.success : rgba(theme.notifications.hidden, 0.8)} />
                                        <Bar dataKey="downtime" stackId="a" fill={this.state.activeChart === 'stability' ? theme.notifications.error : theme.notifications.hidden} />
                                    </BarChart>
                                </ResponsiveContainer>
                        </Paper>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <Paper
                            isBlankData={rigs.charts && rigs.charts.Hashrate && Object.keys(rigs.charts.Hashrate).length === 0}
                            title="Хэшрейт" 
                            loading={Object.keys(rigs.charts).length === 0} 
                            onMouseEnter={(e) => this.setState({ activeChart: 'hashrate' })} 
                            onMouseLeave={() => this.setState({ activeChart: null })}>
                                { Object.keys(rigs.charts).length > 0 ? <Tabs items={this.hashrateCharts()} /> : null }
                        </Paper>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <Paper
                            isBlankData={rigs.charts && rigs.charts.Temperature && rigs.charts.Temperature.length === 0}
                            title="Температура" 
                            loading={Object.keys(rigs.charts).length === 0} 
                            subes={this.getCurrentTemperature()} 
                            onMouseEnter={(e) => this.setState({ activeChart: 'temperature' })} 
                            onMouseLeave={() => this.setState({ activeChart: null })}>
								<ChartTemper items={rigs.charts.Temperature} active={this.state.activeChart === 'temperature'}></ChartTemper>
                        </Paper>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <EventInformer items={rigs.charts.Events} onCloseModal={this.props.getServers}></EventInformer>
                    </Col>
                </Row>
					: null }
                <Paper title="Текущие устройства">
                    <LoaderContainer loading={servers.entities.length === 0}>
                        { servers.entities.length > 0 
                            ? <Tabs 
                                style={{flexDirection: 'column', lineHeight: '1.5'}} 
                                class="tab-server" 
                                activeClass="active-tab-server" 
                                items={this.getItems()}
                                activeItem={match.params.id} 
                                onTab={this.onTab} 
                                // disabled={this.props.rigs.pending.loading} /> 
                                 /> 
                            : null }
                    </LoaderContainer>
                </Paper>
            </div>
        );
    }
}