import React, {useState, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import MovieCard from '../components/MovieCard';
import returnGenres from '../constants/genres';
import {Headers} from '../constants/Headers';

const renderItem = ({item}) => (
  <MovieCard
    title={item.title}
    categories={returnGenres(item.genre_ids)}
    poster={'https://image.tmdb.org/t/p/w154/' + item.poster_path}
    id={item.id}
  />
);

const Search = ({searchQuery, navigation, handleSearchClean}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [state, setState] = useState([]);

  const url = searchQuery
    ? `https://api.themoviedb.org/3/search/movie?query=${searchQuery.trim()}`
    : null;
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
      });
  };

  useEffect(() => {
    Boolean(searchQuery.trim()) && setTimeout(() => fetchData(), 200);
  }, [searchQuery]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      handleSearchClean();
    });

    return unsubscribe;
  }, [navigation]);

  const onRefresh = React.useCallback(() => {
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
    />
  );
};

export default Search;
