import React from 'react';
import { Form, Container, Header, Title, Accordion, TabHeading, StyleProvider, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Text, Badge, H1, H2, H3, Item, Input, Icon, Tab, Tabs, ScrollableTab} from 'native-base';

import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/material';

import { FlatList, ActivityIndicator, RefreshControl, SafeAreaView, View } from 'react-native';
import PropTypes from 'prop-types';

import { Alert } from "react-native";


export default class Eval extends React.Component {

    static propTypes = {
        configuration: PropTypes.array.isRequired,
        onSave: PropTypes.func.isRequired,
        onBack: PropTypes.func.isRequired,
        matchNumber: PropTypes.number.isRequired,
        teamNumber: PropTypes.number.isRequired,
        isBlue: PropTypes.bool.isRequired,
    }

    state = {
        vals: {},
    }

    onRefresh = async () => {
        this.setState({refreshing: true});
        await this.props.refreshTeams();
        this.setState({refreshing: false});
    }

    onBack = () => {
        Alert.alert(
            'Continue without saving?',
            'If you go back, the fields will not be saved.',
            [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Continue',
                  onPress: () => {
                      this.props.onBack(); 
                  },
                },
            ],
            { cancelable: true },
          );
        
    }

    onSave = () => {
        this.props.onSave(this.state.vals); 
        this.getTab(0);
    }

    doNothing = () => {}

    getTab = (tabNumber) => {
        let tabDict = this.props.configuration[tabNumber];
        let title = Object.keys(tabDict)[0];
        let tab = tabDict[title];
        return [title, tab]
    }

    getTabTitle = (tabNumber) => {
        let [title, tab] = this.getTab(tabNumber);
        return title;
    }

    getTabBody = (tabNumber) => {
        let [title, tab] = this.getTab(tabNumber);
        return tab;
    }

    render () {
        if (this.props.configuration.length === 0) {
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <Header color={"#A0A0A0"}>
                            <Body>
                                <Title>Team {this.props.teamNumber}</Title>
                            </Body>
                        </Header>
                        <ActivityIndicator animating={true}/>
                    </Container>
                </StyleProvider>
            );
        } else {
            return (
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <Header>
                            <Left>
                                <Button transparent onPress={this.onBack}>
                                     <Icon name='arrow-back' />
                                </Button>
                            </Left>
                            <Body>
                                <Title>Team {this.props.teamNumber}</Title>
                            </Body>

                            <Right>
                                <Button transparent onPress={this.onSave}>
                                     <Icon name='save' />
                                </Button>
                            </Right>
                        </Header>
                        <Tabs>
                            {/* TODO: Remove hardcoding of three tabs. Use scrollable tabs. https://docs.nativebase.io/Components.html#tabs-scrollable-headref */}
                            <Tab heading={ <TabHeading><Text>{this.getTabTitle(0)}</Text></TabHeading>}>
                                
                            </Tab>
                            <Tab heading={ <TabHeading><Text>{this.getTabTitle(1)}</Text></TabHeading>}>
                                
                            </Tab>
                            <Tab heading={ <TabHeading><Text>{this.getTabTitle(2)}</Text></TabHeading>}>
                                
                            </Tab>
                        </Tabs>
                    </Container>
                </StyleProvider>
            );
        }
        
    }
    
}
