import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { rgba } from 'polished';
import _ from 'lodash';
import { ResponsiveContainer, LineChart, BarChart, Line, Bar, Tooltip } from 'recharts';
import RestartIcon from 'react-icons/lib/io/android-refresh';
import moment from 'moment';
import { toast } from 'react-toastify';

import Title from '~/components/Title';
import { Row, Col } from '~/components/Grid';
import Stat from '~/components/StatRig';
import Tabs from '~/components/Tabs';
import Paper from '~/components/Paper';
import * as ToolTip from '~/components/ToolTip';
import Tag from '~/components/Tag';
import { Table } from '~/components/Table';
import HashrateChart from './charts/Hashrate';
import EventInformer from '~/components/EventInformer';
import ChartTemper from '~/components/ChartTemper';

import typeFromNumber from '~/utils/typeFromNumber';
import hashrate from '~/utils/hashrate';
import getToastSett from '~/utils/getToastSett';
import getClrChartTemper from '~/utils/getClrChartTemper';

import theme from '~/theme';
import { Buttons, Button } from './styles';
import { Message } from '~/scenes/Events/styles';

import * as actions from './actions';
import * as rigsActions from '~/scenes/Rigs/actions';


const Settings = ({ rig, reboot }) => (
    <Buttons>
        <Button disabled={!rig.canReboot} onClick={reboot} type="warning"><div className="icon"><RestartIcon /></div><span>Перезагрузить</span></Button>
    </Buttons>
);

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
	
    rig: state.rig,
	rigs: state.rigs
}), { ...actions, ...rigsActions })
export default class extends Component
{
    state = {
        update: null,
        update2: null,
		activeChart: null,
		showCharts: true,
		settGr: []
    };

    async componentDidMount()
    {
		
        await this.props.getRig(this.props.match.params.id);
		await this.props.getEvents(this.props.match.params.id);
        await this.props.getChartsRig(this.props.match.params.id, true);
		
		if (this.props.rig.error.message === 'NOT DATA') {
			this.setState({ showCharts: false });
		}

		this.setState({
			settGr: this.getSettings(),
			update: setInterval(() => {
				
				this.props.getRig(this.props.match.params.id);
				
			}, 10000), 
			update2: setInterval(() => {
				
				this.props.getEvents(this.props.match.params.id);
				this.props.getChartsRig(this.props.match.params.id, false);
				
			}, 15000) 
		});
    }

    componentWillUnmount()
    {
        this.props.rigClear();
        clearInterval(this.state.update);
        clearInterval(this.state.update2);
    }

	_showMessage = (type, message) => {
		toast(message, getToastSett(type));
	};

    reboot = async () => {
		if(confirm('Вы действительно хотите перезапустить выбранные устройства?')) {
			await this.props.reboot([this.props.match.params.id]);

			if (typeof this.props.rigs.config === 'string')
				this._showMessage('error', this.props.rigs.config);
			else
				this._showMessage('success', 'Успешно перезагружено');
		}
	};

    hashrateCharts = () => {
        let charts = [];
        Object.keys(this.props.rig.charts.Hashrate).map((chart, index) => charts.push({
            label: `${chart}: ${ typeof this.props.rig.charts.currentHashrate[chart] === 'undefined' ? 0 : hashrate(this.props.rig.charts.currentHashrate[chart])}`,
            index: chart,
            content: (
                <ResponsiveContainer key={index} width="100%" height={80}>
                    <LineChart data={this.props.rig.charts.Hashrate[chart]}>
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

		if (Object.keys(this.props.rig.charts).length > 0) {
			Object.keys(this.props.rig.charts.currentTemperatures).map((item, ind) =>
				arr.push(<Tag 
							color={this.state.activeChart === 'temperature' ? getClrChartTemper(item) :  getClrChartTemper()} 
							key={ind}>{ item }: { this.props.rig.charts.currentTemperatures[item] }
						 </Tag>)
			);
		}
		return arr;
	};

    getInfoChart = (chart) => {
        let newChart = [];

        chart.map((item, index) => {
            newChart.push({ ...item, index })
        });

        return newChart;
    };

    getSettings = () => {
    	const group = {};

		_.map(this.props.rig.entities.Config, (item) => {
			if (!group[item.Group]) group[item.Group] = [];
			group[item.Group].push(item);
		});
		return group;
	};

	updateSettings = async () => { 
		await this.props.getRig(this.props.match.params.id);
		this.setState({
			settGr: this.getSettings()
		});
	}

    getStatic = () => {
    	const group = {};

		group['Состояние'] = [];
    	group['Оборудование'] = [];
    	group['Параметры'] = [];

    	group['Оборудование'].push({
			Description: 'Материнская плата',
			Value: this.props.rig.entities.Mainboard,
			Miners: null
		});
    	group['Оборудование'].push({
			Description: 'Процессор',
			Value: this.props.rig.entities.CPU,
			Miners: null
		});
    	group['Оборудование'].push({
			Description: 'Оперативная память',
			Value: `${parseFloat(this.props.rig.entities.RAM / 1024).toFixed(2)} MByte`,
			Miners: null
		});
    	group['Оборудование'].push({
			Description: 'GPU',
			Value: this.props.rig.entities.Driver + ' ' + this.props.rig.entities.GpuCount + 'шт.',
			Miners: null
		});


    	group['Состояние'].push({
			Description: '',
			Value: this.props.rig.entities.IsOnline ? <Tag type="success">В сети</Tag> : <Tag type="error">Не в сети</Tag>,
			Miners: null
		});
    	group['Состояние'].push({
			Description: 'Состояние',
			Value: <div>{ this.props.rig.entities.IsMining ? <span style={{ color: theme.notifications.success }}>Майнинг</span> : <span style={{ color: theme.notifications.error }}>Простой</span> } <Tag type="hidden">{ moment.duration(this.props.rig.entities.miningTime, 'seconds').humanize() }</Tag></div>,
			Miners: null
		});
    	group['Состояние'].push({
			Description: 'Статус',
			Value: <div>{ this.props.rig.entities.StateStr } <Tag type="hidden">{ moment.duration(this.props.rig.entities.stateTime, 'seconds').humanize() }</Tag></div>,
			Miners: null
		});
    	group['Состояние'].push({
			Description: 'Скорость',
			Value: hashrate(this.props.rig.entities.HashRate),
			Miners: null
		});
    	group['Состояние'].push({
			Description: this.props.rig.entities.IsOnline ? 'Uptime' : 'Downtime',
			Value: moment.duration(this.props.rig.entities.IsOnline ? this.props.rig.entities.Uptime : this.props.rig.entities.downtime, 'seconds').humanize(),
			Miners: null
		});



    	group['Параметры'].push({
			Description: 'IP',
			Value: this.props.rig.entities.ip,
			Miners: null
		});
    	group['Параметры'].push({
			Description: 'Pool',
			Value: this.props.rig.entities.Pool,
			Miners: null
		});
    	group['Параметры'].push({
			Description: 'Режим',
			Value: this.props.rig.entities.RunMode,
			Miners: null
		});
    	group['Параметры'].push({
			Description: 'Coin',
			Value: this.props.rig.entities.Coin,
			Miners: null
		});
    	group['Параметры'].push({
			Description: 'Кошелек',
			Value: this.props.rig.entities.Wallet,
			Miners: null
		});

    	return group;
	};

    render()
    {
		
        const { rig } = this.props;
        const { entities } = rig;
        const time = entities.IsOnline ? moment.duration(entities.Uptime, 'seconds') : moment.duration(entities.downtime, 'seconds');

        return (
            <div>
				<Title right={<Settings rig={entities} reboot={this.reboot} />} subtitle={entities.rigHash}> <a href={"/rigs/"+entities.ServerID} > {entities.ServerName} </a> {entities.Name}</Title>
				
				{this.state.showCharts ? <Row>
					<Col xs={12} md={6} lg={3}>
						<Paper title="Стабильность"
                            isBlankData={rig.charts && rig.charts.Stability && rig.charts.Stability.length === 0}
							loading={Object.keys(rig.charts).length === 0} 
							subes={[
								<Tag type={ entities.IsOnline ? 'success' : 'error' }>{ time.humanize(false) }</Tag>,
							]} 
							onMouseEnter={(e) => this.setState({ activeChart: 'stability' })} 
							onMouseLeave={() => this.setState({ activeChart: null })}>
								<ResponsiveContainer width="100%" height={80}>
									<BarChart data={rig.charts.Stability}>
										<Tooltip content={<TooltipStability />} />
										<Bar dataKey="uptime" stackId="a" fill={this.state.activeChart === 'stability' ? theme.notifications.success : rgba(theme.notifications.hidden, 0.8)} />
										<Bar dataKey="downtime" stackId="a" fill={this.state.activeChart === 'stability' ? theme.notifications.error : theme.notifications.hidden} />
									</BarChart>
								</ResponsiveContainer>
						</Paper>
					</Col>
					<Col xs={12} md={6} lg={3}>
						<Paper
                            isBlankData={rig.charts && rig.charts.Hashrate && Object.keys(rig.charts.Hashrate).length === 0}
							title="Хэшрейт" 
							loading={Object.keys(rig.charts).length === 0} 
							onMouseEnter={(e) => this.setState({ activeChart: 'hashrate' })} 
							onMouseLeave={() => this.setState({ activeChart: null })}>
								{ Object.keys(rig.charts).length > 0 ? <Tabs items={this.hashrateCharts()} /> : null }
						</Paper>
					</Col>
					<Col xs={12} md={6} lg={3}>
						<Paper
							isBlankData={rig.charts && rig.charts.Temperature && rig.charts.Temperature.length === 0}
							title="Температура" 
							loading={Object.keys(rig.charts).length === 0} 
							subes={this.getCurrentTemperature()} 
							onMouseEnter={(e) => this.setState({ activeChart: 'temperature' })}
							onMouseLeave={() => this.setState({ activeChart: null })}>
									<ChartTemper items={rig.charts.Temperature} active={this.state.activeChart === 'temperature'}></ChartTemper>
						</Paper>
					</Col>
					<Col xs={12} md={6} lg={3}>
						<EventInformer items={rig.charts.Events} onCloseModal={() => { this.props.getChartsRig(this.props.match.params.id, false) }}></EventInformer>
					</Col>
				</Row>
					: null }
				<Row>
                    <Col xs={12} lg={6}>
						<Paper title="Характеристики" loading={entities === 0}>
							{ Object.keys(entities).length > 0 ?
								<Tabs items={[
									{
										label: 'Параметры',
										index: 0,
										content: <Stat items={this.getStatic()} />
									},
									{
										label: 'Настройки',
										index: 1,
										content: <Stat 
											canEditMode 
											canReboot={entities.canReboot} 
											canEdit={entities.canEdit} 
											ids={[this.props.match.params.id]} 
											items={this.state.settGr} 
											onCancel={this.updateSettings} 
										/>
									},
								]} />
							: null }
						</Paper>
                    </Col>
                    <Col xs={12} lg={6}>
                        <Paper title="События" loading={rig.events.length === 0}>
                            <Table
                                countPerPage={10}
                                columns={[
                                    {
                                        label: 'Время',
                                        index: 'date',
                                        render: (value) => moment.utc(value).local().format('L LTS')
                                    },
                                    {
                                        label: 'Тип',
                                        index: 'EventType'
                                    },
                                    {
                                        label: 'Сообщение',
                                        index: 'Message',
                                        render: (value, record) => <Message type={typeFromNumber(record.MessageT)}>{ value }</Message>
                                    }
                                ]}
                                dataSource={rig.events}
                                pagination={true}
                            />
                        </Paper>
                    </Col>
                </Row>
                <Row>
                    { Object.keys(this.props.rig.charts).length > 0 ? Object.keys(this.props.rig.charts.Hashrate).map((chart, index) => (
                        <HashrateChart key={index} chart={this.getInfoChart(this.props.rig.charts.Hashrate[chart])} title={chart} />
                    )) : null }
                </Row>
            </div>
        );
    }
}