import React, { Component } from 'react';
import moment from 'moment';
import renderHTML from 'react-render-html';
import typeFromNumber from '~/utils/typeFromNumber';

import Paper from '~/components/Paper';
import Event from '~/components/Event';
import Modal from '~/components/Modal';
import EventsTable from '~/scenes/Events/Table';
import { DarkBottom } from './styles';

export const LS_KEY = 'eventsId-eventInf';


export default class EventInformer extends Component {
    static defaultProps = {
        onOpenModal() { },
        onCloseModal() { }
    };

    state = {
        countNew: 0,
        items: [],
        showAll: false,
        hovered: false
    };

    componentDidMount() {
        this.setState({
            countNew: EventInformer.checkNewEvents(this.props.items),
            items: this.props.items
        });
    }

    static getDerivedStateFromProps(props, state) {
        if (props.items && props.items !== state.items) {
            const arrEvents = [...props.items];
            return {
                countNew: EventInformer.checkNewEvents(arrEvents),
                items: arrEvents
            }
        }
        return null;
    }

    static checkNewEvents(arrEvents) {
        let countNew = 0;
        if (arrEvents && arrEvents.length > 0) {
            const arrIdRead = JSON.parse(localStorage.getItem(LS_KEY)) || [];
            arrEvents.forEach(item => {
                if (arrIdRead.includes(item.EventID)) {
                    item.IsRead = true;
                } else {
                    countNew++;
                    item.IsRead = false;
                }
            });
        }
        return countNew;
    }

    showAllEvents = () => {
        this.setState({
            showAll: true
        });
        this.props.onOpenModal();
    }

    hideAllEvents = () => {
        const arrIdRead = JSON.parse(localStorage.getItem(LS_KEY)) || [];
        const arrIdNew = this.state.items.filter(event => !event.IsRead).map(event => event.EventID);
        arrIdRead.splice(0, 0, ...arrIdNew);
        localStorage.setItem(LS_KEY, JSON.stringify(arrIdRead));
        this.setState({
            showAll: false
        });
        this.props.onCloseModal();

        this.state.items.forEach(item => {
            item.IsRead = true;
        });
        this.setState({
            countNew: 0
        });
    }

    render() {
        const { items } = this.state;
        return (
            <span>
                <Paper
                    onMouseEnter={() => { this.setState({hovered: true}); }}
                    onMouseLeave={() => { this.setState({hovered: false}); }}
                    onClick={this.showAllEvents}
                    isBlankData={items && items.length === 0}
                    style={{
                        maxHeight: '245px',
                        overflowY: 'hidden',
                        position: 'relative',
                        cursor: 'pointer'
                    }}
                    outContent={
                        items && items.length > 3
                            ? (<DarkBottom></DarkBottom>)
                            : null
                    }
                    loading={!items}
                    type={this.state.countNew > 0 ? 'yellow' : ''}
                    title={renderHTML(`<span style="color: black">События: ${items ? items.length : 0} (<span class="${this.state.countNew > 0 ? 'color-error-text' : ''}">${this.state.countNew} новых</span>)</span>`)}>
                    {
                        items && items.length > 0
                            ? (
                                items.map((item, index) => (
                                    <Event
                                        className={item.IsRead ? '' : 'new'}
                                        key={index}
                                        type={this.state.hovered || this.state.countNew > 0 ? typeFromNumber(item.MessageT) : null}>
                                        <span className="date">{moment.utc(item.date).local().format('L LT')}</span> &nbsp;
                                        {item.ServerName} &nbsp;
                                        {item.RigName} &nbsp;
                                        <span>{item.Message}</span>
                                    </Event>
                                ))
                            )
                            : null
                    }
                </Paper>
                {this.state.showAll
                    ? <Modal title={`События: ${items ? items.length : 0} (${this.state.countNew} новых)`} unMount={this.hideAllEvents}>
                        <EventsTable items={items}></EventsTable>
                    </Modal>
                    : null
                }
            </span>
        );
    }
}
