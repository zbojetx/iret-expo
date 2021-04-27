import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';

import store from './Stores/CreateStore';
import RootContainer from './Container/RootContainer';

// LogBox.ignoreAllLogs()

export default class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <RootContainer />
            </Provider>
        )
    }
}
