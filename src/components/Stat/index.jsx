import React, { Component } from 'react';
import _ from 'lodash';
import { Container, Content, Item, Title, Text, Buttons, Check, Error, Different, Message, Default, Input, Select, Textarea } from './styles';
import Tabs from '~/components/Tabs';
import Button from "~/components/Button";
import { Toggle } from "~/components/Form";
import { connect } from 'react-redux';
import * as actions from '~/scenes/Rigs/actions';

@connect((state) => ({
	rigs: state.rigs
}), actions)
export default class extends Component
{
	static defaultProps = {
		items: {},
		editable: false,
		canReboot: false,
		canEdit: false,
		editMode: false,
		canEditMode: false,
		onCancel: () => {}
	};

	constructor(props, context)
	{
		super(props, context);

		this.state = {
			items: this.props.items,
			copy: this.props.items,
			editMode: this.props.editMode,
			messageType: null,
			showMessage: false,
			message: '',
			messageDelay: null,
		}
	}

	renderEdit = (item, rootItem, index) => {
		switch (item.Type) {
			case 'bool': return <Toggle changed={item.edited} checked={item.Value} onChange={() => this.changeItem(item, rootItem, index, !item.Value)} />;
			case 'text': return <Input changed={item.edited} type="text" value={item.Value || ''} placeholder={item.DefaultValue} onChange={(e) => this.changeItem(item, rootItem, index, e.target.value)} />;
			case 'int': return <Input changed={item.edited} type="number" value={item.Value || ''} placeholder={item.DefaultValue} min={item.MinValue} max={item.MaxValue} step={item.StepValue} onChange={(e) => this.changeItem(item, rootItem, index, e.target.value)} />;
			case 'textarea': return <Textarea placeholder={item.DefaultValue} onChange={(e) => this.changeItem(item, rootItem, index, e.target.value)}>{item.Value || ''}</Textarea>;
			case 'select': return <Select value={item.Value} onChange={(e) => this.changeItem(item, rootItem, index, e.target.value)}><option value={false}>---</option>{ Object.keys(item.SelectParams).map((param, paramIndex) => <option key={paramIndex} value={param}>{item.SelectParams[param]}</option>) }</Select>;
			default: return <div>---</div>;
		}
	};

	changeItem = (item, rootItem, index, value) => {
		const newGroup = [];

		this.state.copy[rootItem].map((field, fieldIndex) => {
			newGroup.push(fieldIndex === index ? { ...field, Value: value || null, edited: true } : field);
		});

		this.setState({ copy: { ...this.state.copy, [rootItem]: newGroup } });
	};

	editWithReboot = async () => {
		if(confirm('Вы действительно хотите изменить и перезапустить выбранные устройства?')) {
			this.setState({showMessage: false});
			await this.edit(this.props.ids);
			await this.props.reboot(this.props.ids);

			if (typeof this.props.rigs.config === 'string')
				this._showMessage('error', this.props.rigs.config);
			else
				this._showMessage('success', 'Успешно перезагружено');
		}
	};

	edit = async () => {
		if(confirm('Вы действительно хотите изменить выбранные устройства?')) {
			const {copy} = this.state;

			this.setState({showMessage: false});

			const result = [];

			Object.keys(copy).map((group) => {
				_.map(copy[group], (item) => {
					result.push({
						name: item.Name,
						value: item.Value,
						isEnabled: item.isEnabled,
						edited: item.edited || false
					});
				})
			});

			await this.props.edit(this.props.ids, result);

			if (typeof this.props.rigs.config === 'string')
				this._showMessage('error', this.props.rigs.error.message);
			else
				this._showMessage('success', 'Изменения успешно изменены');
		}
	};

	_showMessage = (type, message) => {
		clearTimeout(this.state.messageDelay);
		this.setState({ messageType: type, showMessage: true, message });

		this.setState({ messageDelay: setTimeout(() => this.setState({ showMessage: false }), 10000) });
	};

	setDefault = (item, rootItem, index) => {
		const newGroup = [];

		this.state.copy[rootItem].map((field, fieldIndex) => {
			if (fieldIndex === index) {
				let currentItem = null;
				this.state.items[rootItem].map((itemField, itemIndex) => {
					if (itemIndex === index)
						currentItem = itemField;
				});

				newGroup.push({ ...field, Value: currentItem.Value, edited: false });
			}
			else {
				newGroup.push(field);
			}
		});

		this.setState({ copy: { ...this.state.copy, [rootItem]: newGroup } });
	};

	getItems = () => {
		const items = [];
		_.map(Object.keys(this.state.copy), (item, index) =>
			items.push({
				label: item,
				index: index,
				content: <Content>
					{ _.map(this.state.copy[item], (subitem, subindex) =>
						(subitem.Miners === null || subitem.Miners.includes(this.state.copy['Майнинг'].filter(item => item.Name === 'RUN')[0].Value)) ?
							<Item key={subindex}>
								<Title>{subitem.Description}</Title>
								{ this.state.editMode ?
									<div style={{ display: 'flex', alignItems: 'center' }}>
										{
											this.renderEdit(subitem, item, subindex)
										}
										<Default onClick={() => this.setDefault(subitem, item, subindex)} title="Вернуть значение" />
									</div> : <Text>{subitem.Type === 'select' ? subitem.SelectParams[subitem.Value] :  subitem.Type === 'bool' ?  subitem.Value ? <Check /> : <Error /> : subitem.Value || '---'}</Text> }
								{ subitem.isDifferent ? <Different>Настройки отличаются</Different> : null }
							</Item>
						: null)
					}
					{ !this.props.editable ? (
						<Item>
							{ this.state.editMode ? (
								<Buttons>
									{ this.props.canEdit ? <Button type="success" onClick={this.edit}>Сохранить</Button> : null }
									{ this.props.canReboot && this.props.canEdit ? <Button type="warning" onClick={this.editWithReboot}>Сохранить с перезагрузкой</Button> : null }
									<Button type="error" onClick={() => { this.setState({ editMode: !this.state.editMode, copy: this.state.items }); this.props.onCancel() }}>Отмена</Button>
								</Buttons>
							) : (
								<Buttons>
									{ this.props.canEditMode ? <Button type="success" onClick={() => this.setState({ editMode: !this.state.editMode })}>Редактировать</Button> : null }
								</Buttons>
							) }
						</Item>
					) : null }
				</Content>
			})
		);

		return items;
	};

	render()
	{
		return (
			<Container>
				<Tabs items={this.getItems()} />
				{ this.state.showMessage ? <Message type={this.state.messageType}>{ this.state.message }</Message> : null }
			</Container>
		);
	}
}