import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, RefreshControl} from 'react-native';
import {IconButton, Colors} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {years} from '../constants/Constants';
import {allGenres, returnGenres} from '../constants/genres';
import {Headers} from '../constants/Headers';
import {FlatGrid} from 'react-native-super-grid';
import MovieCard from '../components/MovieCard';

const renderItem = ({item}) => (
  <MovieCard
    title={item.title}
    categories={returnGenres(item.genre_ids)}
    poster={'https://image.tmdb.org/t/p/w154/' + item.poster_path}
    id={item.id}
  />
);

const Discover = () => {
  const [startYear, setStartYear] = useState('2007');
  const [endYear, setEndYear] = useState('2021');
  const [genre, setGenre] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);

  const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&language=en-US&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31&with_genres=${genre}`;
  const config = {
    headers: Headers,
  };

  const fetchData = async () => {
    await setRefreshing(true);
    await fetch(url, config)
      .then(res => res.json())
      .then(data => {
        setState(data.results);
        setRefreshing(false);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [genre, startYear, endYear]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    fetchData().then(() => setRefreshing(false));
  }, []);

  return (
    <View>
      <View
        style={{
          backgroundColor: Colors.deepOrange500,
          height: 50,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
        <View style={{flex: 1}}>
          <Picker
            selectedValue={startYear}
            mode="dropdown"
            style={{color: Colors.white}}
            dropdownIconColor={Colors.white}
            onValueChange={(itemValue, itemIndex) => setStartYear(itemValue)}>
            {years.map(year => (
              <Picker.Item label={year} value={year} key={year} />
            ))}
          </Picker>
        </View>

        <View style={{flex: 1}}>
          <Picker
            selectedValue={endYear}
            mode="dropdown"
            style={{color: Colors.white}}
            dropdownIconColor={Colors.white}
            onValueChange={(itemValue, itemIndex) => setEndYear(itemValue)}>
            {years.map(year => (
              <Picker.Item label={year} value={year} key={year} />
            ))}
          </Picker>
        </View>

        <View style={{flex: 1.3}}>
          <Picker
            selectedValue={genre}
            mode="dropdown"
            style={{color: Colors.white}}
            dropdownIconColor={Colors.white}
            numberOfLines={1}
            onValueChange={(itemValue, itemIndex) => setGenre(itemValue)}>
            {allGenres.map(item => (
              <Picker.Item label={item.name} value={item.id} key={item.id} />
            ))}
          </Picker>
        </View>
      </View>

      <FlatGrid
        data={state}
        spacing={8}
        initialNumToRender={9}
        removeClippedSubviews={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3F51B5', '#3bb78f', '#e91e63']}
          />
        }
        renderItem={renderItem}
        // onEndReachedThreshold={1}
        // onEndReached={() => page < 6 && setPage(page + 1)}
      />
    </View>
  );
};

export default Discover;

export const options = ({navigation}) => ({
  headerStyle: {
    backgroundColor: Colors.deepOrange500,
    elevation: 0,
  },
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
