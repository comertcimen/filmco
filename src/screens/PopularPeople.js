import React, {useState, useEffect, useCallback} from 'react';
import {RefreshControl} from 'react-native';
import MovieCard from '../components/MovieCard';
import {FlatGrid} from 'react-native-super-grid';
import {IconButton, Colors} from 'react-native-paper';
import {Headers} from '../constants/Headers';

const renderItem = ({item}) => (
  <MovieCard
    title={item.name}
    categories={item.known_for_department}
    poster={'https://image.tmdb.org/t/p/w154/' + item.profile_path}
    id={item.id}
    nonMovie={true}
  />
);

const PopularPeople = () => {
  const [page, setPage] = useState(1);
  const [state, setState] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const url = `https://api.themoviedb.org/3/person/popular?page=${page}`;
  const config = {
    headers: Headers,
  };
  const fetchData = async () => {
    await setRefreshing(true);
    await fetch(url, config)
      .then(res => res.json())
      .then(data => {
        let newState = state;
        setState(newState.concat(data.results));
        setRefreshing(false);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    fetchData().then(() => setRefreshing(false));
  }, []);

  return (
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
      onEndReachedThreshold={1}
      onEndReached={() => page < 6 && setPage(page + 1)}
    />
  );
};

export default PopularPeople;

export const options = ({navigation}) => ({
  headerTitle: 'Popular People',
  headerRight: () => (
    <IconButton
      icon="magnify"
      color={Colors.white}
      onPress={() => navigation.navigate('Search')}
    />
  ),
});
