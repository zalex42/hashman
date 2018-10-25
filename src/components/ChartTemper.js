import React, { Component } from 'react';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';

import * as CustomTooltip from '~/components/ToolTip';
import getClrChartTemper from '~/utils/getClrChartTemper';


const TooltipTemperature = (props) => {
  if (props.payload && props.payload.length && props.payload.length > 0) {
    const linesProps = props.payload;
    const date = linesProps[0].payload.date;
    return (
      <CustomTooltip.Container>
        <CustomTooltip.Content>
          <CustomTooltip.Date>{moment.utc(date).local().format('L LT')}</CustomTooltip.Date>
          {linesProps.map((item, index) => {
            const typeKey = `${item.dataKey}Type`;
            const type = item.payload[typeKey] ? item.payload[typeKey] : '';
            return (
              <CustomTooltip.Item key={index} color={item.color}>
                <CustomTooltip.Name>{item.name}</CustomTooltip.Name>
                <CustomTooltip.Text>{item.value} {type}</CustomTooltip.Text>
              </CustomTooltip.Item>
            );
          })}
        </CustomTooltip.Content>
      </CustomTooltip.Container>
    );
  } else {
    return null;
  }
};

export default ({ items, active }) => {
  if (items && items.length > 0) {
    let keys = []; // Инициализируем массив
    
    // Можно кстати для производительно преобразовать это в statefull компонент, и в методе componentDidMount найти все уникальные ключи
    // statefull = class extends Component {
    // Просто сейчас при каждом изменении items они находятся, а так будут находиться один раз
    // Но если так сделать, то надо надеяться, что в новых данных, которые они присылают, остаются те же самые ключив
    
    // Ключ есть график, то есть date Это y, а GPU, ASIC и т.д. - это x1, x2, x3 соответственно
    // Ошибка была в том, что ключи брались только у первого элемента, не учитывалось то, что потом могу появиться новые ключи
    // Находим все уникальные ключи
    // Проходимся по массиву объектов, берём ключи каждого объекта, смотрим, если ключа нет в массиве - добавляем
    items.forEach(item => {
      const k = Object.keys(item).filter(key => !keys.includes(key));
      keys = keys.concat(k);
    });
    const dateInd = keys.indexOf('date'); // Убираем y 
    keys.splice(dateInd, 1);

    const formatedItems = items.map(item => {
      let newItem = { ...item };
      newItem.date = +newItem.date;
       keys.forEach(key => {
        if (typeof newItem[key] === 'string') {
          const arr = newItem[key].split(' ');
          newItem[key] = parseFloat(arr[0].replace(',', '.'));
          newItem[`${key}Type`] = arr[1];
        } 
      }); 
      return newItem;
    });

    // // Удаляем какой-нибудь ключ у половины массива для теста
    // for (let i = 0; i < formatedItems.length / 2; i++) {
    //   delete formatedItems[i][keys[0]]; 
    // }

    return (
      <ResponsiveContainer width="100%" height={80}>
        <LineChart data={formatedItems}>
          <Tooltip content={<TooltipTemperature />} />
          {
            keys.map((key, ind) =>
              <Line dot={false}
                type='monotone'
                key={key}
                dataKey={key}
                strokeWidth={2}
                stroke={active ? getClrChartTemper(key) :  getClrChartTemper()} 
                />
            )
          }
        </LineChart>
      </ResponsiveContainer>);
  } else {
    return null;
  }
}
