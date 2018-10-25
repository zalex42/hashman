import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { toast } from 'react-toastify'

import Title from '~/components/Title';
import Stat from '~/components/Stat';

import getToastSett from '~/utils/getToastSett';
import * as actions from './actions';


@hot(module)
@connect(state => ({
  settings: state.settings
}), actions)
export default class extends Component {
  componentDidMount() {
    this.props.getSettings();
    const interId = setInterval(() => {
      this.props.getSettings();
    }, 5000);

    this.setState({
      interId
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.interId);
  }

  getGroups = (items, key) => {
    const group = {};
    items.forEach(sett => {
      const grKey = sett[key];
      if (!group[grKey]) {
        group[grKey] = [];
      }
      group[grKey].push(sett);
    });
    return group;
  }

  edit = async editItems => {
    this.props.editSettings(editItems);
    if (this.props.settings.error.code !== 0) {
      toast(this.props.rigs.error.message, getToastSett('error'));
    }
    else {
      toast('Изменения успешно применены', getToastSett('success'));
    }
  }

  render() {
    return (
      <div>
        <Title>Настройки</Title>
        <Stat
          canEditMode
          editMode={true}
          alwaysEditMode={true}
          canEdit={true}
          onEdit={this.edit}
          items={this.getGroups(this.props.settings.entities, 'Group')}
          tabsSett={{
            tabType: 'tab',
            color: '#89a8ff',
            style: {
              backgroundColor: 'white'
            }
          }}
          wrapperSett={{
            style: {
              'background-color': 'white',
              'padding': '20px'
            }
          }}
        ></Stat>
      </div>
    );
  }
}
