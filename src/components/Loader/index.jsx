import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Wrapper, Loader } from './styles';

@hot(module)
export default class LoaderContainer extends Component {
    state = {
        showLoad: true,
        once: this.props.once || false
    }

    componentDidUpdate(prevProps) {
        if (this.state.showLoad && this.state.once && prevProps.loading && !this.props.loading) {
            this.setState({
                showLoad: false,
                changed: true
            });
        }
    }

    render() {
        const { children, transparent, style } = this.props;
        return (
            <Wrapper style={style}>
                <Loader loading={this.props.loading && this.state.showLoad} transparent={transparent} />
                { children }
            </Wrapper>
        );
    }
}
