import React from 'react';
import { Form, Container, Header, Title, Accordion, StyleProvider, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon} from 'native-base';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

import { FlatList, ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';
import MatchCell from './MatchCell';
import MatchList from './MatchList';

import ajax from '../../ajax'
import { StackActions } from 'react-navigation';

import GLOBAL from '../../global'

export default class Matches extends React.Component {

    

    async componentDidMount() {
        const matches = await ajax.fetchMatches('2022', 'Central 2019');
        GLOBAL.setState({ matches: matches })
    }

    currentMatch = () => {
        return GLOBAL.state.matches.find((match) => match.key === this.state.currentMatchID);
    }

    setCurrentMatch = (matchId) => {
        GLOBAL.currentMatchID.setState({
            currentMatchID: matchId,
        });
    }

    render () {
        if (GLOBAL.state.currentShotTraditional) {
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <Content>
                            <Text>This is currentQualQuant</Text>
                        </Content>
                    </Container>
                </StyleProvider>
                );
        }
        else if (GLOBAL.state.currentTeamID) {
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <Content>
                            <Text>This is currentTeamID</Text>
                        </Content>
                    </Container>
                </StyleProvider>
                );
        }
        else if (GLOBAL.state.currentMatchID) {
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <Content>
                            <Text>This is currentMatchID</Text>
                        </Content>
                    </Container>
                </StyleProvider>
                );
        }
        else if (GLOBAL.state.matches.length > 0) {
            return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Content>
                        <MatchList matches = {GLOBAL.state.matchess} onItemPress={GLOBAL.setCurrentMatch}/>
                    </Content>
                </Container>
            </StyleProvider>
            );
        } else {
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <Content>
                            <ActivityIndicator size="large"/>
                        </Content>
                    </Container>
                </StyleProvider>
            );
        }

    }
    
}
