import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Paper from '~/components/Paper';


@hot(module)
export default class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        link: 'http://download.hashman.ru/hashman.exe'
      }
    }

    render() {
        return (
            <div>
                <Paper title="Инструкция ASIC INSTALLER">
                    <div class="instruction">
                        <ol class="styled-ol">
                            <li>Скачайте <a href={this.state.link}>AsicInstaller.</a></li>
                            <li>Запустите <a href={this.state.link}>AsicInstaller.</a> на компьютере, находящимся в одной сети с
                              вашими устройствами, либо имеющим доступ к ним (например, VPN).</li>
                            <li>Зайдите в программу, используя свой логин и пароль от личного кабинета.</li>
                            <li>Начните сканирование сети, при необходимости указав подсеть для сканирования.</li>
                            <li>Выберите устройства, на которые хотите установить Hashman с помощью соответствующего пункта в меню установки.</li>
                            <li>Ваши устройства должны появится в личном кабинете.</li>
                        </ol>
                    </div>
                    <a href={this.state.link}>Скачать Hashman Asic Installer</a>
                </Paper>
            </div>
        );
    }
}
