import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ListA, ListB, ListC, ListD} from '../components/Tabs/ListTabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {IconButton, Colors} from 'react-native-paper';

const Tab = createMaterialTopTabNavigator();

const Lists = ({Navigation}) => {
  return (
    <Tab.Navigator
      lazy={true}
      initialRouteName="IN THEATERS"
      backBehavior="none" //Not to return previous visited tab
      tabBarOptions={{
        style: {backgroundColor: Colors.deepOrange500},
        activeTintColor: '#fff',
        labelStyle: {
          fontWeight: 'bold',
        },
        indicatorStyle: {
          backgroundColor: '#fff',
        },
        tabStyle: {
          // Responsive tab width
          width: 'auto',
        },
        scrollEnabled: true,
      }}>
      <Tab.Screen name="HISTORY" component={ListA} />
      <Tab.Screen name="WATCHLIST" component={ListB} />
      <Tab.Screen name="RATINGS" component={ListC} />
      <Tab.Screen name="COLLECTION" component={ListD} />
    </Tab.Navigator>
  );
};

export default Lists;

export const options = {
  headerTitle: 'Your Lists',
  headerStyle: {
    backgroundColor: Colors.deepOrange500,
    elevation: 0,
  },
  headerRight: () => (
    <View style={styles.headerrightcontainer}>
      <IconButton
        icon="arrow-expand-horizontal"
        color={Colors.white}
        onPress={() => ToastAndroid.show('Expand clicked', ToastAndroid.SHORT)}
      />
      <IconButton
        icon="filter-variant"
        color={Colors.white}
        onPress={() => ToastAndroid.show('Filter clicked', ToastAndroid.SHORT)}
      />
      <IconButton
        icon="view-list"
        color={Colors.white}
        onPress={() => ToastAndroid.show('Grid clicked', ToastAndroid.SHORT)}
      />
      <IconButton
        icon="magnify"
        color={Colors.white}
        onPress={() => navigation.navigate('Search')}
      />
    </View>
  ),
};

const styles = StyleSheet.create({
  headerrightcontainer: {
    flexDirection: 'row',
  },
});
