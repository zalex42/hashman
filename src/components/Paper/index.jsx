import React from 'react';

import LoaderContainer from '~/components/Loader';
import Tag from '~/components/Tag';
import { Container, Title, Subes } from "./styles";


export default ({ title, subes, style, type, 
                  children, loading, onMouseEnter, 
                  onMouseLeave, onClick, isBlankData,
                  outContent = false, 
                  isBlankDataMessage = 'Нет данных для отображения' }) => (
    <Container type={type} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
        <LoaderContainer loading={loading}>
            { title 
                ? <Title type={type}>{title}</Title> 
                : null 
            }
            { isBlankData
                ? <Tag type="hidden">{isBlankDataMessage}</Tag>
                : null
            }
            { subes 
                ? (
                    <Subes>
                        { Array.isArray(subes) ? subes.map((sub, index) => sub) : subes }
                    </Subes>
                  ) 
                : null 
            }
            { children }
        </LoaderContainer>
        { outContent }
    </Container>
);