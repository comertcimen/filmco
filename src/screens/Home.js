import React from 'react';
import {View, StatusBar, ToastAndroid, StyleSheet} from 'react-native';
import {IconButton, Colors} from 'react-native-paper';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TabA, TabB, TabC, TabD, TabE} from '../components/Tabs/HomeTabs';

const Tab = createMaterialTopTabNavigator();

const Home = ({navigation}) => {
  const isOpen = useIsDrawerOpen();
  return (
    <>
      <StatusBar
        backgroundColor={isOpen ? 'rgba(0,0,0,0.2)' : Colors.deepOrange500}
        animated
        //To show navbar on statusbar. Add Statusbar height as padding top to header!
        translucent={true}
      />
      <Tab.Navigator
        lazy={true}
        initialRouteName="IN THEATERS"
        backBehavior="none" //Not to return previous visited tab
        removeClippedSubviews={true}
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
        <Tab.Screen name="TOP 250" component={TabA} />
        <Tab.Screen name="TRENDING" component={TabB} />
        <Tab.Screen name="IN THEATERS" component={TabC} />
        <Tab.Screen name="COMING SOON" component={TabD} />
        <Tab.Screen name="DVD RELEASES" component={TabE} />
      </Tab.Navigator>
    </>
  );
};

export default Home;

export const options = ({navigation}) => ({
  headerTitle: 'Filmco',
  headerStyle: {
    backgroundColor: Colors.deepOrange500,
    elevation: 0,
  },
  headerLeft: () => (
    <IconButton
      icon="menu"
      color={Colors.white}
      onPress={() => navigation.openDrawer()}
    />
  ),
  headerRight: () => (
    <View style={styles.headerrightcontainer}>
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
});

const styles = StyleSheet.create({
  headerrightcontainer: {
    flexDirection: 'row',
  },
});
