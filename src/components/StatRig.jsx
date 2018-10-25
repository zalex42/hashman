import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { toast } from 'react-toastify'
;
import Stat from '~/components/Stat';

import getToastSett from '~/utils/getToastSett';
import * as actions from '~/scenes/Rigs/actions';


@connect((state) => ({
	rigs: state.rigs
}), actions)
export default class extends Component
{
	edit = async editItems => {
		if(confirm('Вы действительно хотите изменить выбранные устройства?')) {
			await this.props.edit(this.props.ids, editItems);

			if (typeof this.props.rigs.config === 'string') {
				toast(this.props.rigs.error.message, getToastSett('error'));
			}
			else {
				toast('Изменения успешно применены', getToastSett('success'));
			}
		}
	};

	reboot = async () => {
		if (confirm('Вы действительно хотите перезапустить выбранные устройства?')) {
			await this.props.reboot(this.props.ids);
			if (typeof this.props.rigs.config === 'string') {
				toast(this.props.rigs.config, getToastSett('error'));
			} else {
				toast('Успешно перезагружено', getToastSett('success'));
			}
		}
	}

	render()
	{
		return (
			<Stat 
				{...this.props}
				onEdit={this.edit}
				onReboot={this.reboot}
			></Stat>
		);
	}
}
