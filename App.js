import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';
import WelcomeScreen from './screen/WelcomeScreen';
import HomePage from './screen/HomePage';

export default function App() {
  return (
    <View style={styles.container}>
    <NativeRouter>
      <Switch>
        <Route exact path="/" component={WelcomeScreen} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/timeline" component={HomePage} />
      </Switch>
    </NativeRouter>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
