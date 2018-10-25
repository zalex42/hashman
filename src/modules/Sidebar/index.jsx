import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import * as Sidebar from './styles';
import FlashIcon from 'react-icons/lib/io/flash';

type Props = {
    logo: any,
    navigate: Array<{
        to: string,
        icon: any,
        label: string
    }>
}

@connect((state) => ({
    sidebar: state.sidebar
}), actions)
export default class extends Component<Props>
{
    enterHandler = () => {
        this.props.hoverSidebar();
    };

    leaveHandler = () => {
        this.props.leaveSidebar();
    };

    type = () => {
        const { hovered, hidden } = this.props.sidebar;

        if (hovered) return 'big';

        if (hidden) return 'small';

        return 'big';
    };

    render()
    {
        const { logo, navigate } = this.props;
        const { hidden, hovered } = this.props.sidebar;
        console.log(this.props);

        return (
            <Sidebar.Wrapper type={this.type()} onMouseEnter={this.enterHandler} onMouseLeave={this.leaveHandler}>
                <Sidebar.Logo to={logo.to}>
					{ hidden && !hovered ?
						<img src="http://haashman.ru/cabinet/dist/img/logo-mini.svg" alt="Hashman" width={50} /> :
						<img src="http://haashman.ru/cabinet/dist/img/logo-mini.svg" alt="Hashman" width={100} />
                	}
					{ hidden && !hovered ?
						null :
						'Hashman'
					}
                </Sidebar.Logo>
                <Sidebar.Content>
                    { navigate.map((item, index) => (
                        <Sidebar.Link key={index} to={item.to} activeClassName="active" type={this.type()} onClick={() => window.innerWidth <= 480 ? this.props.toggleSidebar() : null}>
                            <Sidebar.Icon type={this.type()}><item.icon /></Sidebar.Icon>
                            <Sidebar.Label type={this.type()}>{item.label}</Sidebar.Label>
                        </Sidebar.Link>
                    )) }
                </Sidebar.Content>
            </Sidebar.Wrapper>
        );
    }
}