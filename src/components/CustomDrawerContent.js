import React from 'react';
import {DrawerItem} from '@react-navigation/drawer';
import {
  Alert,
  ScrollView,
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Colors, Avatar} from 'react-native-paper';

const CustomDrawerContent = ({navigation}) => {
  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Account')}>
        <ImageBackground
          source={require('../assets/bg_orange.png')}
          style={styles.imagebg}>
          <Avatar.Icon
            size={45}
            icon="account"
            style={styles.avataricon}
            labelStyle={{color: Colors.grey900}}
          />
          <View style={styles.accnamecontainer}>
            <Text style={styles.accname}>comertcimen</Text>
            <Icon name="chevron-right" size={20} color="#fff" />
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>

      <DrawerItem
        label="Notifications"
        icon={() => <Icon color={Colors.grey700} size={20} name="bell" />}
        onPress={() => navigation.navigate('Notifications')}
      />

      <DrawerItem
        label="Popular People"
        icon={() => <Icon color={Colors.grey700} size={20} name="account" />}
        onPress={() => navigation.navigate('PopularPeople')}
      />

      <DrawerItem
        label="Discover"
        icon={() => <Icon color={Colors.grey700} size={20} name="filmstrip" />}
        onPress={() => navigation.navigate('Discover')}
      />

      <DrawerItem
        label="TV"
        icon={() => <Icon color={Colors.grey700} size={20} name="monitor" />}
        onPress={() =>
          Alert.alert(
            'Coming Soon',
            'TV shows tracking app will be available soon.',
          )
        }
      />

      <DrawerItem
        label="History"
        icon={() => <Icon color={Colors.grey700} size={20} name="history" />}
        onPress={() => navigation.navigate('Lists', {screen: 'HISTORY'})}
      />

      <DrawerItem
        label="Watchlist"
        icon={() => (
          <Icon color={Colors.grey700} size={20} name="playlist-edit" />
        )}
        onPress={() => navigation.navigate('Lists', {screen: 'WATCHLIST'})}
      />

      <DrawerItem
        label="Ratings"
        icon={() => <Icon color={Colors.grey700} size={20} name="star" />}
        onPress={() => navigation.navigate('Lists', {screen: 'RATINGS'})}
      />

      <DrawerItem
        label="Collection"
        icon={() => (
          <Icon color={Colors.grey700} size={20} name="playlist-play" />
        )}
        onPress={() => navigation.navigate('Lists', {screen: 'COLLECTION'})}
      />

      <DrawerItem
        label="Settings"
        icon={() => <Icon color={Colors.grey700} size={20} name="cog" />}
        onPress={() => navigation.navigate('Settings')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagebg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 0,
  },
  avataricon: {
    backgroundColor: Colors.grey200,
  },
  accnamecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  accname: {
    color: '#fff',
    fontSize: 15,
  },
});

export default CustomDrawerContent;
