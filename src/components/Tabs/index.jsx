import React, { Component } from 'react';
import { Tabs, Navigation, NavItem, TabNavigation, Content } from './styles';
import Button from '~/components/Button';

export default class extends Component {
    state = {
        current: 0
    };

    static defaultProps = {
        onTab: () => { },
        style: {},
        class: '',
        activeClass: '',
        color: undefined,
        tabType: 'button' // enum: button, tab
    };

    componentDidMount() {
        // parseInt(this.props.activeItem) || this.props.items[0].index || 0
        let curr = parseInt(this.props.activeItem) 
                    ? parseInt(this.props.activeItem)
                    : this.props.items[0] 
                        ? this.props.items[0].index 
                            ? this.props.items[0].index 
                            : 0
                        : 0;
        this.setState({ current: curr });
    }

    clickHandler = (index) => {
        if (this.state.current !== index) {
            this.setState({ current: index });
            this.props.onTab(index);
        }
    };

    getCurrent = () => this.props.items.filter((item) => item.index === this.state.current)[0] || null;

    render() {
        const { items } = this.props;

        let nav;
        if (this.props.tabType === 'button') {
            nav = 
                <Navigation>
                    {items.map((item) =>
                        <Button
                            key={item.index}
                            type={this.state.current === item.index ? 'primary' : 'hidden'}
                            style={this.props.style}
                            className={this.state.current === item.index ? this.props.activeClass : this.props.class}
                            onClick={() => this.clickHandler(item.index)}>{item.label}
                        </Button>
                    )}
                </Navigation>
        } else if (this.props.tabType === 'tab') {
            nav = 
                <TabNavigation>
                    {items.map((item) =>
                        <NavItem
                            key={item.index}
                            active={this.state.current === item.index}
                            type={this.state.current === item.index ? 'primary' : 'hidden'}
                            style={this.props.style}
                            color={this.props.color}
                            className={this.state.current === item.index ? this.props.activeClass : this.props.class}
                            onClick={() => this.clickHandler(item.index)}>{item.label}
                        </NavItem>
                    )}
                </TabNavigation>
        }

        return (
            <Tabs>
                {nav}
                <Content key={this.state.current}>
                    {this.getCurrent() ? this.getCurrent().content : null}
                </Content>
            </Tabs>
        );
    }
}