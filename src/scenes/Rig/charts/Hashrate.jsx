import React, { Component } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceArea, Tooltip, CartesianGrid } from 'recharts';
import { Row, Col } from '~/components/Grid';
import Paper from '~/components/Paper';
import theme from '~/theme';
import { ZoomOut, Label } from "../styles";
import moment from "moment";
import { scaleTime } from 'd3-scale';
import { timeDay } from 'd3-time';
import * as ToolTip from '~/components/ToolTip';

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

export default class extends Component
{
    state = {
        data: null,
        left : 'dataMin',
        right : 'dataMax',
        refAreaLeft : '',
        refAreaRight : '',
        top : 'dataMax',
        bottom : 0,
        animation : true
    };

    componentDidMount()
    {
        this.setState({ data: this.props.chart.slice(0, -2) });
    }

    componentWillReceiveProps()
    {
        this.setState({ data: this.props.chart.slice(0, -2) });
    }

    getAxisYDomain = (from, to, ref, ref2, offset) => {
        const refData = this.state.data.filter((item) => item[ref] >= from && item[ref] <= to);
        let [ bottom, top ] = [ refData[0][ref2], refData[0][ref2] ];
        refData.forEach( d => {
            if ( d[ref2] > top ) top = d[ref2];
            if ( d[ref2] < bottom ) bottom = d[ref2];
        });

        return [ (bottom|0) - offset, (top|0) + offset ]
    };

    zoom = () => {
        let { refAreaLeft, refAreaRight, data } = this.state;

        if ( refAreaLeft === refAreaRight || refAreaRight === '' ) {
            this.setState( () => ({
                refAreaLeft : '',
                refAreaRight : ''
            }) );
            return;
        }

        // xAxis domain
        if ( refAreaLeft > refAreaRight )
            [ refAreaLeft, refAreaRight ] = [ refAreaRight, refAreaLeft ];

        // yAxis domain
        const [ bottom, top ] = this.getAxisYDomain( refAreaLeft, refAreaRight, 'date', 'value', 1 );

        this.setState( () => ({
            refAreaLeft : '',
            refAreaRight : '',
            data : data.slice(),
            left : refAreaLeft,
            right : refAreaRight,
            bottom, top
        } ) );
    };

    zoomOut = () => {
        this.setState({
            data: this.state.data,
            left : 'dataMin',
            right : 'dataMax',
            refAreaLeft : '',
            refAreaRight : '',
            top : 'dataMax',
            bottom : 0,
            animation : true
        });
    };

    render()
    {
        const { title } = this.props;
        const { data, left, right, refAreaLeft, refAreaRight, top, bottom } = this.state;

        const domainToday = scaleTime().domain([timeDay.floor(left), timeDay.ceil(right)]);
        const ticks = domainToday.ticks(timeDay.every(1));

        return (
            <Col xs={12} lg={6}>
                { data ? (
                    <Paper title={`Hashrate: ${title}`} loading={false} style={{ fontSize: '12px' }}>
                        { typeof left === 'number' ? <ZoomOut onClick={this.zoomOut} /> : null }
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                data={data}
                                onMouseDown={(e) => this.setState({refAreaLeft:e.activeLabel})}
                                onMouseMove={(e) => this.state.refAreaLeft && this.setState({refAreaRight:e.activeLabel})}
                                onMouseUp={this.zoom}
                            >
                                <XAxis
                                    allowDataOverflow={true}
                                    dataKey="date"
                                    domain={[left, right]}
                                    type="category"
                                    scale="linear"
                                    tickFormatter={(value) => moment.utc(value).local().format('L LT')}
                                    axisLine={false}
                                    ticks={ticks}
                                    interval="preserveEnd"
                                >
                                    <Label value="Дата" offset={0} position="insideBottom" />
                                </XAxis>
                                <YAxis
                                    allowDataOverflow={true}
                                    domain={[bottom, typeof left !== 'number' ? (value) => Math.floor((value + (value / 2)) / 10) * 10 : top]}
                                    type="number"
                                    yAxisId="1"
                                    axisLine={false}
                                    scale="linear"
                                >
                                    <Label value="Значение" offset={0} angle={-90} position="insideLeft" />
                                </YAxis>
                                <Tooltip content={<TooltipHashrate />}/>
                                <CartesianGrid strokeDasharray="2 2"/>
                                <Line yAxisId="1" dot={false} type='monotone' dataKey='value' strokeWidth={2} stroke={theme.notifications.warning} fill={theme.notifications.warning} />
                                {
                                    (refAreaLeft && refAreaRight) ? (
                                        <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight}  strokeOpacity={0.3} /> ) : null

                                }
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                ) : null }
            </Col>
        );
    }
}
