import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Paginate from 'react-paginate';
import _ from 'lodash';
import HeaderColumn from './HeaderColumn';
import Column from './Column';
import SelectColumn from './SelectColumn';
import { Toggle } from '~/components/Form';
import { Container, TableContainer, Table, Header, Body, Row, Pagination, Footer, Column as TableColumn } from './styles';

export default class extends Component
{
    static defaultProps = {
        pagination: false,
        countPerPage: 25,
        fixedHeader: false,
		selected: false,
		footer: null,
        onRow: (record) => ({}),
        styleRow: (record) => ({}),
		onRowClick: (record) => ({}),
		onRowClickFan: (record) => ({}),
		onRowClickPower: (record) => ({}),
		hideHeader: false,
		style: null,
		footerRow: null
    };

    constructor(props, context)
    {
        super(props, context);

        this.state = {
            columns: this.props.columns,
            dataSource: this.props.dataSource,
            copySource: this.props.dataSource,
            sorterColumn: null,
            sorterOrder: null,
            sorterFunc: null,
            countPerPage: this.props.countPerPage,
            currentPage: 0,
            filters: {},
			footer: false,
            pagination: this.props.pagination,
            fixedHeader: this.props.fixedHeader,
            headerHeight: 0,
            headerPosition: 0,
			selected: this.props.selected,
			selectedColumns: [],
            columnWidth: {},
			hideHeader: this.props.hideHeader,
			style: this.props.style,
			footerRow: this.props.footerRow
        };
    }

    componentDidMount()
    {
        /*this.setState({ headerHeight: findDOMNode(this.refs.header).offsetHeight });

        window.addEventListener('scroll', this._onScroll);*/
    }

    _onScroll = () => {
        /*const currentPosition = -(findDOMNode(this.refs.table).getBoundingClientRect().top - 80);
        if (currentPosition >= 0)
            this.setState({ headerPosition: currentPosition });
        else
            this.setState({ headerPosition: 0 });*/
    };

    componentWillReceiveProps()
    {
        this.setState({
            columns: this.props.columns,
            dataSource: this.props.dataSource,
            copySource: this.props.dataSource,
			footerRow: this.props.footerRow
        }, () => this.updateTable());
    }

    updateTable = () => {
        this.filterBy();

        if (this.state.sorterColumn !== null) this.applySorting();
    };

    applySorting = () => {
        this.setState((prevState) => ({
            copySource: [ ...prevState.copySource.sort(prevState.sorterFunc) ],
        }));

        if (this.state.sorterOrder === 'desc')
            this.setState((prevState) => ({
                copySource: [ ...prevState.copySource.reverse() ],
            }));
    };

    compareBy = (column, compareFunc) => {
        if (this.state.sorterColumn === column)
            this.setState((prevState) => ({
                copySource: [ ...prevState.copySource.reverse() ],
                sorterOrder: prevState.sorterOrder === 'asc' ? 'desc' : 'asc'
            }));
        else
            this.setState((prevState) => ({
                copySource: [ ...prevState.copySource.sort(compareFunc) ],
                sorterColumn: column,
                sorterFunc: compareFunc,
                sorterOrder: 'asc'
            }));
    };

    addFilter = async (filter) => {
        let currentFilters = [];
        if (typeof this.state.filters[filter.column] !== 'undefined')
            currentFilters = this.state.filters[filter.column];

        await this.setState((prevState) => ({ filters: { ...prevState.filters, [filter.column]: [ ...currentFilters, filter ] } }));
        this.updateTable();
    };

    removeFilter = async (filter) => {
        await this.setState((prevState) => ({ filters: { ...prevState.filters, [filter.column]: [ ...prevState.filters[filter.column].filter((item) => item.filter !== filter.id) ] } }));
        if (this.state.filters[filter.column].length === 0) {
            const filters = this.state.filters;

            let newFilters = {};

            Object.keys(filters).filter((item) => item !== filter.column).map((item) => newFilters[item] = filters[item]);

            await this.setState({ filters: newFilters });
        }

        this.updateTable();
    };

    filterBy = () => {
        if (Object.keys(this.state.filters).length > 0)
        {
            let filterByColumn = [];

            for (let column in this.state.filters) {
                const copy = [];

                this.state.filters[column].map((filter) => {
                    copy.push(...this.state.dataSource.filter(filter.filterFunc));
                });

                filterByColumn.push(_.uniq(copy));
            }

            this.setState({ copySource: _.intersectionWith(...filterByColumn, _.isEqual) });
        }
        else {
            this.setState({ copySource: this.state.dataSource });
        }
    };

    changePage = (data) => {
        this.setState({ currentPage: data.selected });
    };

    setColumnWidth = async (column, width) => {
        await this.setState((prevState) => ({ columnWidth: { ...prevState.columnWidth, [column]: width } }));
    };

    selectColumn = async (e) => {
		const selectedColumns = this.state.selectedColumns;

		const newColumns = [];
		let isset = false;
		selectedColumns.map((column) => {
			if (column === e) isset = true;
			if (column !== e) newColumns.push(column);
		});

		if (!isset) newColumns.push(e);

		console.warn(newColumns);

		await this.setState({ selectedColumns: newColumns });

	};

    selectColumns = (columns) => {
		const selectedColumns = this.state.selectedColumns;
		const newColumns = [ ...selectedColumns ];

		columns.map((column) => {
			if (!selectedColumns.includes(column)) newColumns.push(column);
		});

		this.setState({ selectedColumns: newColumns });
	};

    removeColumns = (columns) => {
		const selectedColumns = this.state.selectedColumns.filter((selectedColumn) => !columns.includes(selectedColumn));

		this.setState({ selectedColumns });
	};

    selectAll = (e) => {
    	const { currentPage, copySource, countPerPage, pagination } = this.state;
		let currentColumns = pagination ? copySource.slice(currentPage * countPerPage, (currentPage + 1) * countPerPage) : copySource;
		const selectedColumns = this.state.selectedColumns;

		const columns = [];

		currentColumns.map((column) => {
			columns.push(column.RigID);
		});

		if (!e)
			this.selectColumns(columns);
		else
			this.removeColumns(columns);
	};

    allChecked = () => {
		const { currentPage, copySource, countPerPage, pagination } = this.state;
		let currentColumns = pagination ? copySource.slice(currentPage * countPerPage, (currentPage + 1) * countPerPage) : copySource;
		const selectedColumns = this.state.selectedColumns;

		let result = 0;

		currentColumns.map((column) => {
			if (!selectedColumns.includes(column.RigID)) result--;
		});

		return result === 0;
	};

    hasActive = () => {

	};

    reboot = async () => {

	};

    render()
    {
        const { columns, dataSource, copySource, currentPage, countPerPage, pagination, selected, selectedColumns } = this.state;
        const { footer } = this.props;

        let source = copySource;
        if (pagination)
            source = source.slice(currentPage * countPerPage, (currentPage + 1) * countPerPage);

        return (
            <Container>
                <TableContainer>
                    { this.state.fixedHeader ? (
                        <Table fixed top={this.state.headerPosition}>
							<Header ref="header">
								<Row>
									{ selected ? <SelectColumn all checked={this.allChecked()} hasActive={this.hasActive()} onChange={this.selectAll} /> : null }
									{ columns.map((column, index) => <HeaderColumn ref={column.index} width={this.state.columnWidth[column.index]} key={index} { ...column } compareBy={this.compareBy} addFilter={this.addFilter} removeFilter={this.removeFilter} sorterColumn={this.state.sorterColumn} activeFilter={Object.keys(this.state.filters).includes(column.index)} source={dataSource} />) }
								</Row>
							</Header>
                        </Table>
                    ) : null }
						<Table style={this.state.style} ref="table" topOffset={this.state.headerHeight}>
                        { !this.state.hideHeader ? (
                            <Header ref="header">
                                <Row>
									{ selected ? <SelectColumn all checked={this.allChecked()} hasActive={this.hasActive()} onChange={this.selectAll} /> : null }
                                    { columns.map((column, index) => <HeaderColumn key={index} { ...column } compareBy={this.compareBy} addFilter={this.addFilter} removeFilter={this.removeFilter} sorterColumn={this.state.sorterColumn} activeFilter={Object.keys(this.state.filters).includes(column.index)} source={dataSource} />) }
                                </Row>
                            </Header>
                        ) : null }
                        <Body>
                            { source.map((item, index) => (
                                <Row key={index} selected={this.state.selectedColumns.includes(item.RigID)} style={this.props.styleRow(item)}>
									{ selected ? <SelectColumn { ...item } index={index} checked={selectedColumns.includes(item.RigID)} onChange={this.selectColumn} /> : null }
                                    { columns.map((column) => <Column onClick={() => column.index == 'CoolFan' ? this.props.onRowClickFan(item): column.index == 'power' ? this.props.onRowClickPower(item) : this.props.onRowClick(item) } key={`${column.index}-${index}`} { ...column } record={ item } onRow={this.props.onRow} setColumnWidth={this.setColumnWidth} />) }
                                </Row>
                            )) }
							{ this.state.footerRow ?
								<Row key='footer'>
									{ columns.map((column, index) => <Column key={`footer-${index}`} footer {...column} record={ this.state.footerRow } onRow={this.props.onRow} setColumnWidth={this.setColumnWidth} />) }
								</Row>
							: null }
                        </Body>
						{ footer ?
							<Footer>
								<Row>
									<TableColumn colSpan={selected ? columns.length + 1 : columns.length}>
										{ this.props.footer(this.state) }
									</TableColumn>
								</Row>
							</Footer>
						: null }
                    </Table>
                </TableContainer>
                <Pagination>
                    { copySource.length / countPerPage > 1 ? <Toggle checked={!this.state.pagination} onChange={() => this.setState({ pagination: !this.state.pagination })}>Показать все</Toggle> : null }
                    { pagination && copySource.length / countPerPage > 1 ?
                            <Paginate
                                previousLabel={"<"}
                                nextLabel={">"}
                                breakLabel={<a>...</a>}
                                breakClassName={"break"}
                                pageCount={copySource.length / countPerPage}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.changePage}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}
                            />
                    : null }
                </Pagination>
            </Container>
        );
    }
}