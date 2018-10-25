import React, { Component } from 'react';
import Paper from '~/components/Paper';
import { Modal, Container, Close, CloseIcon, Title } from './styles';
import FaCloseIcon from 'react-icons/lib/fa/close';

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
					<CloseIcon onClick={this.props.unMount} ><FaCloseIcon style={{color: 'black'}} /></CloseIcon>
					{
						this.props.title && this.props.title !== '' 
						  ? <Title>{this.props.title}</Title>
						  : null
					}
					<Paper loading={this.props.loading}>
						{ this.props.children }
					</Paper>
				</Modal>
			</Container>
        );
    }
}