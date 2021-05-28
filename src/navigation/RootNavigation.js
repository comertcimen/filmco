import React from 'react';
import {Platform, StatusBar} from 'react-native';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Home,
  Search,
  Discover,
  Lists,
  Notifications,
  PopularPeople,
  Settings,
  Account,
  Movie,
  HomeOptions,
  PopularPeopleOptions,
  ListsOptions,
  DiscoverOptions,
} from '../screens';
import {Colors} from 'react-native-paper';
import CustomDrawerContent from '../components/CustomDrawerContent';
import Mysearchbar from '../components/Mysearchbar';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const defaultOptions = {
  headerTitleStyle: {
    color: '#fff',
  },
  headerStyle: {
    backgroundColor: Colors.deepOrange500,
  },
  headerTintColor: '#fff',
  headerPressColorAndroid: '#fff',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const RootNavigation = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = text => {
    setSearchQuery(text);
  };

  const handleSearchClean = () => {
    setSearchQuery('');
  };

  return (
    <Stack.Navigator initialRouteName={Home} screenOptions={defaultOptions}>
      <Stack.Screen name="Home" component={Home} options={HomeOptions} />
      <Stack.Screen
        name="Search"
        options={({navigation}) => ({
          headerTitle: props => (
            <Mysearchbar
              {...props}
              searchQuery={searchQuery}
              handleSearch={handleSearch}
              handleSearchClean={handleSearchClean}
            />
          ),
        })}>
        {props => (
          <Search
            {...props}
            searchQuery={searchQuery}
            handleSearchClean={handleSearchClean}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Discover"
        component={Discover}
        options={DiscoverOptions}
      />
      <Stack.Screen name="Lists" component={Lists} options={ListsOptions} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen
        name="PopularPeople"
        component={PopularPeople}
        options={PopularPeopleOptions}
      />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Movie" component={Movie} />
    </Stack.Navigator>
  );
};

export default RootNavigation;

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="Home">
      <Drawer.Screen name="RootNavigation" component={RootNavigation} />
    </Drawer.Navigator>
  );
};
