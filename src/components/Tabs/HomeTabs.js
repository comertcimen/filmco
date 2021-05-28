import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, RefreshControl} from 'react-native';
import MovieCard from '../MovieCard';
import returnGenres from '../../constants/genres';
import {FlatGrid} from 'react-native-super-grid';
import {Headers} from '../../constants/Headers';

const renderItem = ({item}) => (
  <MovieCard
    title={item.title}
    categories={returnGenres(item.genre_ids)}
    poster={'https://image.tmdb.org/t/p/w154/' + item.poster_path}
    id={item.id}
    backdrop={'https://image.tmdb.org/t/p/w780/' + item.backdrop_path}
  />
);

export const TabA = () => {
  const [state, setState] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const url = 'https://api.themoviedb.org/3/list/634';
  const config = {
    headers: Headers,
  };
  const fetchData = async () => {
    await setRefreshing(true);
    await fetch(url, config)
      .then(res => res.json())
      .then(data => {
        setState(data.items);
        setRefreshing(false);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    />
  );
};

export const TabB = () => {
  const [page, setPage] = useState(1);
  const [state, setState] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const url = `https://api.themoviedb.org/3/trending/movie/week?page=${page}`;
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

export const TabC = () => {
  const [page, setPage] = useState(1);
  const [state, setState] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const url = `https://api.themoviedb.org/3/movie/now_playing?page=${page}`;
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

export const TabD = () => {
  const [page, setPage] = useState(1);
  const [state, setState] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const url = `https://api.themoviedb.org/3/movie/upcoming?page=${page}`;
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

export const TabE = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>No results found</Text>
    </View>
  );
};
