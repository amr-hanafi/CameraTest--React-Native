import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './App/Store/store';
import MyApp from './App/App';

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();

    this.state = {
      store: configureStore().store,
    }
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <MyApp />
      </Provider>
    );
  }
}
