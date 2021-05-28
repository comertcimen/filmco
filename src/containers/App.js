import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerNavigation} from '../navigation/RootNavigation';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  dark: true, //Override dark mode
};

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <DrawerNavigation />
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
