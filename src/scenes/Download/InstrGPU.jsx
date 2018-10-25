import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import * as actions from '~/scenes/Servers/actions';
import LoaderContainer from '~/components/Loader';
import Title from '~/components/Title';
import Paper from '~/components/Paper';
import { Table } from '~/components/Table';
import renderHTML from 'react-render-html';


@hot(module)
@connect((state) => ({
    servers: state.servers
}), actions)
export default class extends Component {
    state = {
        update: null
    };

    async componentDidMount() {
        this.props.getServers();

        this.setState({
            update: setInterval(() => {
                this.props.getServers();
            }, 5000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.update);
    }

    getDownloadValue() {
        const servers = this.props.servers.entities
            .filter(server => server.downloadUrl)
            .map(server => {
                return {
                    serverName: server.ServerName,
                    downloadUrl: server.downloadUrl
                };
            });
        return servers;
    }

    render() {
        const { servers } = this.props;
        const dwnValues = this.getDownloadValue();
        return (
            <div>
                <Paper title="Инструкция GPU">
                    <div class="instruction">
                        <ol class="styled-ol">
                            <li>Скачайте образ flash, для выбранной вами фермы.</li>
                            <li>
                                <span>
                                    <span class="fw-5">Windows:</span> Используйте одно из перечисленных средств: {'\u00A0'}
                                    <a href="http://hddguru.com/software/HDD-Raw-Copy-Tool/">HDD Raw Copy</a>, {'\u00A0'}
                                    <a href="https://sourceforge.net/projects/win32diskimager/">Win32 Disk Imager</a>, {'\u00A0'}
                                    <a href="https://etcher.io/">Etcher</a>, {'\u00A0'}
                                    <a href="https://rufus.akeo.ie/">Rufus</a>, {'\u00A0'}
                                    для того чтобы
                                    развернуть образ на флэш-накопитель.
                                </span>
                                <div class="t-i-25px">
                                    <span class="fw-5">Linux:</span> <code class="fs-15-px">dd if=hashman.img of=/dev/sdb</code>
                                </div>
                            </li>
                            <li>Подключите ригу к сети интернет. Запустите ригу с флэш-накопителя,
                                указав в BIOS загрузку с USB Flash.</li>
                            <li>Если все прошло успешно, вы увидите новое устройство в личном кабинете,
                                откуда и продолжите его настройку.
                                ID Риги будет видно в приглашении, после успешной загрузки.</li>
                        </ol>
                        <span>Для настройки остальных риг, повторите весь процесс, начиная с пункта 2.</span>
                    </div>
                </Paper>
                <Paper>
                    <LoaderContainer loading={servers.entities.length === 0}>
                        {
                            dwnValues.length === 0
                                ? 'Нет доступных для загрузки образов'
                                : <Table
                                    columns={[
                                        {
                                            label: 'Ферма',
                                            index: 'serverName'
                                        },
                                        {
                                            index: 'downloadUrl',
                                            hideHeader: true,
                                            render: val => {
                                                return renderHTML(`<a href='${val}'>Скачать</a>`);
                                            }
                                        }
                                    ]}
                                    dataSource={dwnValues}
                                    pagination={false}
                                />
                        }
                    </LoaderContainer>
                </Paper>
            </div>
        );
    }
}
