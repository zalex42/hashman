import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import * as actions from './actions';

import Title from '~/components/Title';
import Paper from '~/components/Paper';
import LoaderContainer from '~/components/Loader';
import EventsTable from './Table';

export const LS_KEY = 'eventsId';


@hot(module)
@connect((state) => ({
    events: state.events
}), actions)
export default class Events extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            update: null,
            unread: 0,
            initLocKey: props.location ? props.location.key : '' // For check reclick on route link to this component
        }
    }

    componentDidMount()
    {
        this.props.getEvents().then(() => {
            this.setState({
                unread: this.props.events.entities.filter(ev => !ev.IsRead).length
            });
        });
        this.setState({
            update: setInterval(() => {
                this.props.getEvents().then(() => {
                    this.setState({
                        unread: this.props.events.entities.filter(ev => !ev.IsRead).length
                    });
                });
            }, 5000)
        });
    }

    componentDidUpdate() {
        if (this.props.location && this.state.initLocKey !== this.props.location.key && this.props.match.isExact) {
            const arrIdNew = this.props.events.entities.map(event => event.EventID);
            localStorage.setItem(LS_KEY, JSON.stringify(arrIdNew));
            this.props.getEvents();
            this.setState({
                initLocKey: this.props.location.key,
                unread: 0
            });
        }
    }

    componentWillUnmount()
    {
        clearInterval(this.state.update);
        const arrIdNew = this.props.events.entities.map(event => event.EventID);
        localStorage.setItem(LS_KEY, JSON.stringify(arrIdNew));
    }

    render()
    {
        const { events } = this.props;
        return (
            <div>
                <Title sub={{ type: 'success', label: `(новых: ${this.state.unread})` }}>История событий</Title>
                <Paper title="">
                    <LoaderContainer loading={events.pending.loading} once={true}>
                        <EventsTable items={events.entities} {...this.props}/>
                    </LoaderContainer>
                </Paper>
            </div>
        );
    }
}