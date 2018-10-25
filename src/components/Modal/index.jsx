import React, { Component } from 'react';
import Paper from '~/components/Paper';
import { Modal, Container, Close } from './styles';

export default class extends Component
{
	static defaultProps = {
		loading: false,
		unMount: () => {}
	};

	constructor(props)
	{
		super(props);
	}

    render()
    {
        return (
        	<Container>
				<Close onClick={this.props.unMount} />
				<Modal>
					<Paper loading={this.props.loading}>
						{ this.props.children }
					</Paper>
				</Modal>
			</Container>
        );
    }
}