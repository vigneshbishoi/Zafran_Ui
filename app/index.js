import { LogBox } from 'react-native';
import { persistor, store } from "app/store";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Utils from "@utils";
Utils.setupLayoutAnimation();
LogBox.ignoreAllLogs(true);

const Mazi = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaProvider>
                    <App />
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
};

export default Mazi;
