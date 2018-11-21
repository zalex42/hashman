import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import _ from 'lodash';
import { toast } from 'react-toastify';

import Button from '~/components/Button';
import Stat from '~/components/StatRig';
import Modal from '~/components/Modal';
import LoaderContainer from '~/components/Loader';
import { Table } from '~/components/Table';
import Tag from '~/components/Tag';

import getToastSett from '~/utils/getToastSett';
import hashrate from '~/utils/hashrate';
import temperature from '~/utils/temperature';
import isMobile from '~/utils/isMobile';

import * as actions from './actions';

//import Translate from '~/components/Translate';
var Translate = require('~/components/Translate');

@hot(module)
@connect((state) => ({
    rigs: state.rigs
}), actions)
export default class extends Component
{
    rebootDis = true;
	state = {
		editMode: false,
        update2: null,
		ids: []
	};
    deleteDis = true;

    RunWithDelay=()=>{
        if (this.props.rigs.EventsUpdate.length !=0) {
        global.tempCopyEventsUpdate = this.props.rigs.EventsUpdate;
        global.Events = this.props.rigs.charts.Events;
        setTimeout(function(){
    
            global.tempCopyEventsUpdate.map((Event) => {
                global.Events.reverse();
                global.Events.push(Event);
                global.Events.reverse();
        });
    
        }, 2000);//getcharts асихронная, поэтому запускаем обновление через 2секунды, чтобы гарантировать получение данных.
        //в худшем случае обновление отобразится через 15 секунд.
    
    }
    }

    async componentDidMount()
    {
        this.props.getRigs(this.props.server.ServerID);
        await this.props.getCharts(this.props.server.ServerID, true, '');

        if (this.props.rigs.error.message === 'NOT DATA') {
        	this.props.showCharts();
        }
        this.setState({ update2: setInterval(() => {
                this.props.getCharts(this.props.server.ServerID, false, this.props.rigs.lastIDEvents);
                //global.lastIDEvents = this.props.rigs.lastIDEvents;
                this.RunWithDelay();
         }, 15000) });

    }

    componentWillUnmount()
    {
        this.props.rigsClear();
        clearInterval(this.state.update2);
    }

	_showMessage = (type, message) => {
		toast(message, getToastSett(type));
	};

	reboot = async (ids) => {
		if(confirm('Вы действительно хотите перезапустить выбранные устройства?')) {
			await this.props.reboot(ids);

			if (typeof this.props.rigs.config === 'string')
				this._showMessage('error', this.props.rigs.config);
			else
				this._showMessage('success', 'Успешно перезагружено');
		}
	};

	deleteH = async (ids) => {
		if(confirm('Вы действительно хотите удалить выбранные устройства?')) {
			await this.props.deleteH(ids);

//			if (this.props.rigs.config != true)
//				this._showMessage('error', this.props.rigs.config.message);
        if (typeof this.props.rigs.config === 'string')
            this._showMessage('error', this.props.rigs.config);
        else
				this._showMessage('success', 'Успешно удалено');
		}
 //       this.props.history.push(`/rigs/${this.props.server.ServerID}`);
        this.props.getCharts(this.props.server.ServerID, true, '');
        this.props.getRigs(this.props.server.ServerID);
    };

    edit = async (ids) => {
		await this.props.getGConfig(ids);
		this.openStat(ids);
	};

    openStat = (ids) => {
    	this.setState({ editMode: true, ids });
	};

	getSettings = () => {
//        clearInterval(this.props.state.update);
		const group = {};
		_.map(this.props.rigs.gconfig, (item) => {
			if (!group[item.Group]) group[item.Group] = [];
			group[item.Group].push(item);
		});

		return group;
	};

	editDisabled = (tableProps) => {
		if (tableProps.selectedColumns.length === 0) return true;

		let i = 0;

		_.map(tableProps.copySource, (item) => {
            item.canEdit = true;
			if (tableProps.selectedColumns.includes(item.RigID) && item.canEdit) i++;
        });
        
        return i !== tableProps.selectedColumns.length;
	};

	rebootDisabled = (tableProps) => {
		if (tableProps.selectedColumns.length === 0) {
            this.rebootDis = true;
            return true;
        }

		let i = false;

		_.map(tableProps.copySource, (item) => {
			if (tableProps.selectedColumns.includes(item.RigID) && item.canReboot) i = true;
		});

        this.rebootDis = !i;
		return !i;
    };

	deleteDisabled = (tableProps) => {
		if (tableProps.selectedColumns.length === 0) {
            this.deleteDis = true;
            return true;
        }

        this.deleteDis = false;
		return false;
    };

    editCancel() {
        this.setState({ editMode: false });
        this.props.getCharts(this.props.server.ServerID, true, '');
        this.props.getRigs(this.props.server.ServerID);
    }
    
    render()
    {
        const { rigs } = this.props;
        return (
            <LoaderContainer loading={rigs.entities.length === 0}>
                { rigs.entities.length > 0 ? (
                    <Table
						selected
						footer={(props) =>
								(
									<div style={{ display: 'flex' }}>
										<Button disabled={this.editDisabled(props)} type="primary" onClick={() => this.edit(props.selectedColumns)}>{Translate('Редактировать')}</Button>
										<Button disabled={this.rebootDisabled(props)} type="warning" onClick={() => this.reboot(props.selectedColumns)}>Перезагрузить</Button>
										<Button disabled={this.deleteDisabled(props)} type="warning" onClick={() => this.deleteH(props.selectedColumns)}>Удалить</Button>
									</div>
								)
						}
                        columns={[
                            {
                                label: 'ID',
                                index: 'UID',
                                hide: isMobile
                            },
                            {
                                label: 'Имя',
                                index: 'Name',
                                sorter: true,
                                compare: (a, b) => a.Name.localeCompare(b.Name)
                            },
                            {
                                label: 'IP',
                                index: 'IP',
                                sorter: true,
                                hide: isMobile,
                                compare: (a, b) => a.IP.localeCompare(b.IP)
                            },
                            {
                                label: 'Статус',
                                index: 'StateStr',
                                render: (value, record) => <Tag type={record.StateStrT}>{ value }</Tag>,
                                filtered: true
                            },
                            {
                                label: 'Режим',
                                index: 'RunMode',
                                render: (value, record) => <Tag type={record.RunModeT}>{ value }</Tag>,
                                hide: isMobile,
                                filtered: true
                            },
							{
								label: 'Coin',
								index: 'Coin',
                                hide: isMobile,
								filtered: true
							},
                            {
                                label: 'Температура',
                                index: 'MaxTemp',
                                render: (value, record) => <Tag type={record.MaxTempT}>{ temperature(value) }</Tag>,
                                sorter: true,
                                compare: (a, b) => a.MaxTemp - b.MaxTemp
                            },
                            {
                                label: 'Хэшрейт',
                                index: 'Hashrate',
                                render: (value, record) => <Tag type={ record.HashrateT }>{ hashrate(value) }</Tag>,
                                sorter: true,
                                compare: (a, b) => +a.Hashrate - +b.Hashrate
                            },
                        ]}
                        dataSource={rigs.entities[0].Rigs}
                        pagination={true}
						onRowClick={(record) => this.props.history.push(`/rig/${record.RigID}`)}
                    />
                ) : null }
                { this.state.editMode 
                    ? <Modal unMount={() => this.editCancel()} 
                             loading={this.props.rigs.pending.loading}><Stat 
                             editMode 
                             canReboot={!this.rebootDis} 
                             canEdit="true" 
                             ids={this.state.ids} 
                             items={this.getSettings()} 
                             onCancel={() => { this.editCancel(); }} />
                      </Modal> 
                    : null }
            </LoaderContainer>
        );
    }
}