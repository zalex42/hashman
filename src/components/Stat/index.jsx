import React, { Component } from 'react';
import _ from 'lodash';

import Tabs from '~/components/Tabs';
import Button from "~/components/Button";
import { Toggle } from "~/components/Form";

import { Container, Content, Item, Title, Text, Buttons, Check, Error, Different, Default, Input, Select, Textarea, EnabledBlock, EnabledLabel, TextTooltip } from './styles';
//import {Image} from 'react-native';
//import {Icon } from 'native-base';

import {Tooltip} from '~/components/react-lightweight-tooltip';
//import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckIcon from 'react-icons/lib/fa/info-circle';
import CircleIcon from 'react-icons/lib/fa/circle';

const greenRoundedStyle = {
  content: {
    backgroundColor: 'white',
		color: '#000',
		display: '10',
		fontSize: '.8em',

	},
  tooltip: {
    position: 'absolute',
    backgroundColor: 'green',
    borderRadius: '10px',
    marginBottom: '0px',
	},


};

export default class extends Component {
	static defaultProps = {
		items: {},
		editable: false,
		canReboot: false,
		canEdit: false,
		editMode: false,
		alwaysEditMode: false,
		canEditMode: false,
		tabsSett: {}, // settings for tabs
		wrapperSett: {}, // settings for styled component "Content"
		onCancel: () => { },
		onEdit: () => { },
		onReboot: () => { }
	};

	state = {
		tempInitItems: null,
		tempCopyItems: null,
		editMode: this.props.editMode,
		renderProps: true // for control what now source for render - props.items or state.tempCopyItems
	}

	componentDidMount() {
		if (this.state.editMode && !this.props.alwaysEditMode) {
			this.startEdit();
		}
	}

	componentDidUpdate(prevProps) {
		if (Object.keys(prevProps.items).length === 0 
				&& Object.keys(this.props.items).length > 0
				&& this.props.editMode) {
			this.startEdit();
		}

		if (!this.state.renderProps && !_.isEqual(this.props.items, prevProps.items)) {
			this.setState({
				tempInitItems: null,
				tempCopyItems: null,
				renderProps: true
			});
		}
	}

	renderEdit = (item, rootItem, index) => {
		switch (item.Type) {
			case 'bool': return <Toggle changed={item.edited} checked={item.Value} onChange={() => this.changeItem(item, rootItem, index, !item.Value)} />;
			case 'text': return <Input changed={item.edited} type="text" value={item.Value || ''} placeholder={item.DefaultValue} onChange={(e) => this.changeItem(item, rootItem, index, e.target.value)} />;
			case 'int': return <Input changed={item.edited} type="number" value={item.Value || ''} placeholder={item.DefaultValue} min={item.MinValue} max={item.MaxValue} step={item.StepValue} onChange={(e) => this.changeItem(item, rootItem, index, e.target.value)} />;
			case 'textarea': return <Textarea  placeholder={item.DefaultValue} onChange={(e) => this.changeItem(item, rootItem, index, e.target.value)}>{item.Value || ''}</Textarea>;
			case 'select': return <Select value={item.Value} onChange={(e) => this.changeItem(item, rootItem, index, e.target.value)}><option value={false}>---</option>{Object.keys(item.SelectParams).map((param, paramIndex) => <option key={paramIndex} value={param}>{item.SelectParams[param]}</option>)}</Select>;
			default: return <div>---</div>;
		}
	};

	renderEditCurrentValue = (item, rootItem, index) => {
	
		if (this.props.alwaysEditMode2 == "true") {
			switch (item.Type) {
			case 'bool': return item.currentValue ? <CircleIcon color = "green" size = "30" /> : <CircleIcon color = "red" size = "30" />;
			case 'text': return <div> {item.currentValue} </div>; 
			case 'int': return <div> {item.currentValue}</div>; 
//			case 'textarea': return <Textarea  placeholder={item.DefaultValue} onChange={(e) => this.changeItem(item, rootItem, index, e.target.value)}>{item.Value || ''}</Textarea>;
//			case 'select': return <Select value={item.currentValue} onChange={(e) => this.changeItem(item, rootItem, index, e.target.value)}><option value={false}>---</option>{Object.keys(item.SelectParams).map((param, paramIndex) => <option key={paramIndex} value={param}>{item.SelectParams[param]}</option>)}</Select>;
			default: return <div>---</div>;
			}
		}
	};

	changeItem = (item, rootItem, index, value) => {
		const newGroup = _.cloneDeep(this.state.tempCopyItems[rootItem]);
		newGroup[index].Value = value || null;
		newGroup[index].edited = true;
		this.setState({
			tempCopyItems: {
				...this.state.tempCopyItems,
				[rootItem]: newGroup
			}
		});
	};

	renderEnabled = (item, rootItem, index) => {
		return item.useEnabled ? (
			<EnabledBlock>
				<EnabledLabel>Использовать:</EnabledLabel>
				<Toggle checked={item.isEnabled} onChange={() => this.changeEnabled(item, rootItem, index)} />
			</EnabledBlock>
		) : null;
	};

	changeEnabled = (item, rootItem, index) => {
		const copy = _.cloneDeep(this.state.tempCopyItems[rootItem]);
		copy[index].isEnabled = !copy[index].isEnabled
		this.setState({
			tempCopyItems: {
				...this.state.tempCopyItems,
				[rootItem]: copy
			}
		});
	};

	startEdit = () => {
		this.setState({
			editMode: true,
			tempInitItems: _.cloneDeep(this.props.items),
			tempCopyItems: _.cloneDeep(this.props.items),
			renderProps: false
		});
	}

	editFacade = async (reboot = false, cancel = false) => {
		const { tempCopyItems } = this.state;

		const result = [];

		Object.keys(tempCopyItems).map((group) => {
			_.map(tempCopyItems[group], (item) => {
				result.push({
					name: item.Name,
					value: item.Value,
					isEnabled: item.isEnabled,
					edited: item.edited || false
				});
			})
		});

		await this.props.onEdit(result);

		if (reboot) {
			await this.props.onReboot();
		}

		this.setState({
			editMode: !this.state.editMode || this.props.alwaysEditMode || this.props.alwaysEditMode2
		});
		if (this.props.alwaysEditMode2 == null) {
			if (cancel) {
				this.props.onCancel();
			}
		}
	}

	setDefault = (item, rootItem, index) => {
		const copy = _.cloneDeep(this.state.tempCopyItems[rootItem]);
		copy[index] = this.state.tempInitItems[rootItem][index];
		this.setState({
			tempCopyItems: {
				...this.state.tempCopyItems,
				[rootItem]: copy
			}
		});
	};

	cancel = () => {
		let newState = { 
			editMode: !this.state.editMode || this.props.alwaysEditMode,
			renderProps: true
		};

		if (this.props.alwaysEditMode) {
			newState.tempInitItems = _.cloneDeep(this.props.items);
			newState.tempCopyItems = _.cloneDeep(this.props.items);
		}

		this.setState(newState); 
		this.props.onCancel()
	}

	getItems = () => {
		const items = [];

		const group = this.state.editMode && !this.state.renderProps || this.props.alwaysEditMode
			? this.state.tempCopyItems ? this.state.tempCopyItems : this.props.items
			: this.props.items;
			

		_.map(Object.keys(group), (item, index) =>
			items.push({
				label: item,
				index: index,
				content: <Content {...this.props.wrapperSett}>
					{_.map(group[item], (subitem, subindex) =>
						(!subitem.Miners || subitem.Miners === null || subitem.Miners.includes(group['Майнинг'].filter(item => item.Name === 'RUN')[0].Value))
							?	// (!subitem.Coins || subitem.Coins.includes(group['Майнинг'].filter(item => item.Name === 'COIN')[0].Value)) ?

							<Item key={subindex}>
								<Title>{subitem.Description}</Title>
								{
									this.state.editMode
										?
										<div style={{ display: 'flex', alignItems: 'center'}}>
											{this.renderEdit(subitem, item, subindex)}
											{this.renderEditCurrentValue(subitem, item, subindex)}

											{<Tooltip 
																content = {
																	<TextTooltip>
																								{
																									subitem.Hint
																								} 
																							</TextTooltip>
																}
																styles={greenRoundedStyle}
												>
											<CheckIcon />
											</Tooltip>}

											{
												this.renderEnabled(subitem, item, subindex)
											}
											
											<Default onClick={() => this.setDefault(subitem, item, subindex)} title="Вернуть значение" />
											
										</div>
									
									
										:
										
										!(subitem.isEnabled) & (item=="Разгон" || item=="Основные" || item=="Майнинг")
										?
										<Text style= {{textDecoration: "line-through", color: "gainsboro"}}>
											{
												subitem.Type === 'select'
													? subitem.SelectParams[subitem.Value]
													: subitem.Type === 'bool'
														? subitem.Value
															? <Check />
															: <Error />
														: subitem.Value || '---'
											
											} 
										</Text>
										:
										<Text>
											{
												subitem.Type === 'select'
													? subitem.SelectParams[subitem.Value]
													: subitem.Type === 'bool'
														? subitem.Value
															? <Check />
															: <Error />
														: subitem.Value || '---'
											
											} 
										</Text>
								}
								{subitem.isDifferent ? <Different>Настройки отличаются</Different> : null}
							</Item>
							// : null
			: null)
					}
					{
						!this.props.editable
							? (
								<Item>
									{
										this.state.editMode
											? (
												<Buttons>
													{this.props.canEdit ? <Button type="success" onClick={() => { this.editFacade(false, true); }}>Сохранить</Button> : null}
													{this.props.canReboot && this.props.canEdit ? <Button type="warning" onClick={() => { this.editFacade(true, true); }}>Сохранить с перезагрузкой</Button> : null}
													<Button type="error" onClick={this.cancel}>Отмена</Button>
												</Buttons>
											)
											: (
												<Buttons>
													{this.props.canEditMode ? <Button type="success" onClick={this.startEdit}>Редактировать</Button> : null}
												</Buttons>
											)
									}
								</Item>
							)
							: null
					}
				</Content>
			})
		);

		return items;
	};

	render() {
		return (
		<Container>
				<Tabs items={this.getItems()} {...this.props.tabsSett} />
			</Container>
		);
	}
}
