import React from 'react';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import {Card, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Colors, Menu} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const MovieCard = ({title, poster, categories, id, nonMovie, backdrop}) => {
  const [visible, setVisible] = React.useState(false);
  const navigation = useNavigation();

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View>
      <TouchableNativeFeedback
        useForeground={true}
        onPress={() =>
          !nonMovie &&
          navigation.navigate('Movie', {
            id: id,
            title: title,
            poster: poster,
            categories: categories,
            backdrop: backdrop,
          })
        }>
        <Card style={styles.card}>
          <Card.Cover
            style={styles.poster}
            source={{
              uri: poster,
            }}
            resizeMode="cover"
          />
          <View style={styles.content}>
            <View
              style={{
                flexDirection: 'row',
                height: 36,
                paddingVertical: 2,
                justifyContent: 'space-between',
              }}>
              <Text style={styles.title} numberOfLines={2}>
                {title}
              </Text>

              {!nonMovie && (
                <Menu
                  style={{marginTop: 50}}
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={
                    <TouchableWithoutFeedback onPress={openMenu}>
                      <Icon
                        name="dots-vertical"
                        size={20}
                        color={Colors.grey500}
                      />
                    </TouchableWithoutFeedback>
                  }>
                  <Menu.Item
                    onPress={() => {
                      ToastAndroid.show(`${title} Rated`, ToastAndroid.SHORT);
                      closeMenu();
                    }}
                    title="Rate Movie"
                  />
                  <Menu.Item
                    onPress={() => {
                      ToastAndroid.show(
                        `${title} Added to History`,
                        ToastAndroid.SHORT,
                      );
                      closeMenu();
                    }}
                    title="Add to History"
                  />
                  <Menu.Item
                    onPress={() => {
                      ToastAndroid.show(
                        `${title} Added to Watchlist`,
                        ToastAndroid.SHORT,
                      );
                      closeMenu();
                    }}
                    title="Add to Wathclist"
                  />
                  <Menu.Item
                    onPress={() => {
                      ToastAndroid.show(
                        `${title} Added to Collection`,
                        ToastAndroid.SHORT,
                      );
                      closeMenu();
                    }}
                    title="Add to Collection"
                  />
                  <Menu.Item
                    onPress={() => {
                      ToastAndroid.show(
                        `${title} Added to Custom List`,
                        ToastAndroid.SHORT,
                      );
                      closeMenu();
                    }}
                    title="Add to a Custom List"
                  />
                </Menu>
              )}
            </View>

            <Text style={styles.categories} numberOfLines={1}>
              {categories}
            </Text>
          </View>
        </Card>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    //width: 120,
    //flex: 1,
    borderRadius: 3,
  },
  poster: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    aspectRatio: 2 / 3,
    maxWidth: '100%',
  },
  title: {
    fontSize: 13,
    width: '90%',
  },
  categories: {
    fontSize: 10,
    color: Colors.grey500,
    marginBottom: 5,
  },
  content: {
    paddingHorizontal: 4,
  },
});

export default MovieCard;
