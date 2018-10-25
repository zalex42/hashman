import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import renderHTML from 'react-render-html';
import moment from 'moment';
import 'moment/locale/ru';
import 'moment-duration-format';

import Title from '~/components/Title';
import Paper from '~/components/Paper';
import LoaderContainer from '~/components/Loader';
import { Table } from '~/components/Table';
import Button from "~/components/Button";
import * as actions from './actions';
import './dateStyles';


@hot(module)
@connect((state) => ({
    reports: state.reports,
}), actions)
@withRouter
export default class extends Component
{
    state = {
		startDate: new Date(),
		endDate: new Date()
    };

	getUptime = () => {
    	const { entities } = this.props.reports;
    	let sumPerc = 0;

			entities.forEach(item => {
				sumPerc += parseFloat(item.uptime);
			});
			return Number.isNaN(sumPerc / entities.length) ? 0 : (sumPerc / entities.length).toFixed(1);
	};

	getUpseconds = () => {
		const { entities } = this.props.reports;
		let sumSec = 0;
		entities.forEach(item => {
			sumSec += item.upseconds;
		});
		return sumSec;
	};

	getDowntime = () => {
  	const { entities } = this.props.reports;
    let sum = 0;
		entities.forEach((item) => {
			sum += parseFloat(item.downtime);
		});

		return Number.isNaN(sum / entities.length) ? 0 : (sum / entities.length).toFixed(1);
	};

	getDownseconds = () => {
		const { entities } = this.props.reports;
		let sumSec = 0;
		entities.forEach(item => {
			sumSec += item.downseconds;
		});
		return sumSec;
	};

	getIncome = () => {
    	const { entities } = this.props.reports;
    	let sum = 0;

    	if (entities.length > 0)
			entities.map((item) => sum += parseFloat(item.income));

    	return sum.toFixed(1);
	};

	getOutcome = () => {
    	const { entities } = this.props.reports;
    	let sum = 0;

    	if (entities.length > 0)
			entities.map((item) => sum += parseFloat(item.outcome));

    	return sum.toFixed(1);
	};

	startDateHandler = async (from) => {
		if (typeof from === 'undefined')
			await this.setState({ startDate: new Date() });
		else
			await this.setState({ startDate: from });
	};

	endDateHandler = async (to) => {
		if (typeof to === 'undefined')
			await this.setState({ endDate: new Date() });
		else
			await this.setState({ endDate: to });
	};

	getStartDate = () => {
		return moment(this.state.startDate).format('YYYY-MM-DD');
	};

	getEndDate = () => {
		return moment(this.state.endDate).format('YYYY-MM-DD');
	};

	getReports = () => {
		this.props.getReports(this.getStartDate(), this.getEndDate());
	};

    render()
    {
        const { reports } = this.props;
		const modifiers = { start: this.state.startDate, end: this.state.endDate };

        return (
            <div>
                <Title>Отчёт</Title>
				<Paper title="Отчёты">
					<div className="InputFromTo">
						<DayPickerInput
							value={this.state.startDate}
							placeholder="Начало"
							format="L"
							formatDate={formatDate}
							parseDate={parseDate}
							dayPickerProps={{
								selectedDays: [this.state.startDate, { from: this.state.startDate, to: this.state.endDate }],
								disabledDays: { after: this.state.endDate },
								toMonth: this.state.endDate,
								modifiers,
								numberOfMonths: 1,
								onDayClick: () => this.to.getInput().focus(),
								locale: 'ru',
								localeUtils: MomentLocaleUtils,
							}}
							onDayChange={this.startDateHandler}
						/>
						{' - '}
						<span className="InputFromTo-to">
								<DayPickerInput
									ref={el => (this.to = el)}
									value={this.state.endDate}
									placeholder="Конец"
									format="L"
									formatDate={formatDate}
									parseDate={parseDate}
									dayPickerProps={{
										selectedDays: [this.state.startDate, { from: this.state.startDate, to: this.state.endDate }],
										disabledDays: { before: this.state.startDate },
										modifiers,
										month: this.state.startDate,
										fromMonth: this.state.startDate,
										numberOfMonths: 1,
										locale: 'ru',
										localeUtils: MomentLocaleUtils,
									}}
									onDayChange={this.endDateHandler}
								/>
							</span>
						<Button type="primary" onClick={this.getReports}>Сформировать</Button>
					</div>
					<LoaderContainer loading={reports.pending.loading} transparent={0.4}>
						<Table
							columns={[
								{
									label: 'Рига',
									index: 'RigName',
									sorter: true,
									compare: (a, b) => a.RigName.localeCompare(b.RigName)
								},
								{
									label: 'Работа',
									index: 'uptime',
									render: (value, { upseconds }) => (
										renderHTML(`
											<div> ${moment.duration(upseconds, 's').format('d[д] hh:mm:ss', { trim: false })} </div>
											<div>${value}%</div>`
										)
									),
									sorter: true,
									compare: (a, b) => a.uptime - b.uptime
								},
								{
									label: 'Простой',
									index: 'downtime',
									render: (value, { downseconds }) => (
										renderHTML(`
											<div> ${moment.duration(downseconds, 's').format('d[д] hh:mm:ss', { trim: false })} </div>
											<div>${value}%</div>`
										)
									),
									sorter: true,
									compare: (a, b) => a.downtime - b.downtime
								},
								{
									label: 'Ожидаемая прибыль',
									index: 'income',
									render: (value) => value + ' $',
									sorter: true,
									compare: (a, b) => a.income - b.income
								},
								{
									label: 'Упущенная прибыль',
									index: 'outcome',
									render: (value) => value + ' $',
									sorter: true,
									compare: (a, b) => a.outcome - b.outcome
								}
							]}
							dataSource={[...reports.entities]}
							pagination={true}
							footerRow={
								{
									RigName: 'Итого',
									upseconds: this.getUpseconds(),
									uptime: this.getUptime(),
									downseconds: this.getDownseconds(),
									downtime: this.getDowntime(),
									income: this.getIncome(),
									outcome: this.getOutcome()
								}
							}
							onRowClick={(record) => this.props.history.push(`/rig/${record.RigID}`)}
						/>
					</LoaderContainer>
				</Paper>
            </div>
        );
    }
}