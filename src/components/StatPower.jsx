import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { toast } from 'react-toastify'
;
import Stat from '~/components/Stat';

import getToastSett from '~/utils/getToastSett';
import * as actions from '~/scenes/Servers/actions';


@connect((state) => ({
	servers: state.servers
}), actions)
export default class extends Component
{
	edit = async editItems => {
		if(confirm('Вы действительно хотите изменить выбранные устройства?')) {
			await this.props.editPower(this.props.id, editItems);

			if (typeof this.props.servers.config === 'string') {
				toast(this.props.servers.error.message, getToastSett('error'));
			}
			else {
				toast('Изменения успешно применены', getToastSett('success'));
//toast( this.props.servers.config, getToastSett('success'));
			}
		}
	};



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
