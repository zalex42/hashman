import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Table } from '~/components/Table';
import typeFromNumber from '~/utils/typeFromNumber';
import { Message } from './styles';


export default ({ items }) => (<Table
  columns={[
    {
      label: 'Время',
      index: 'date',
      render: value => moment.utc(value).local().format('L LTS')
    },
    {
      label: 'Сервер',
      index: 'ServerName',
      render: (value, record) => <Link to={`/rigs/${record.ServerID}`}>{value}</Link>,
      filtered: true
    },
    {
      label: 'Рига',
      index: 'RigName',
      render: (value, record) => <Link to={`/rig/${record.RigID}`}>{value}</Link>,
      filtered: true
    },
    {
      label: 'Тип',
      index: 'EventType',
      filtered: true
    },
    {
      label: 'Сообщение',
      index: 'Message',
      render: (value, record) => <Message type={typeFromNumber(record.MessageT)}>{value}</Message>
    }
  ]}
  dataSource={items}
  pagination={true}
  styleRow={(record) => {
    if (!record.IsRead) {
      return { backgroundColor: '#edfff2' }
    }
  }}
  onRowClick={(record) => {
    if (this.props.history) {
      this.props.history.push(`/rig/${record.RigID}`)
    }
  }}
/>);
