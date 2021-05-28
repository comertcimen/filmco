import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Headers} from '../constants/Headers';
import {Paragraph, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const Movie = ({route}) => {
  const {id, title, poster, categories, backdrop} = route.params;
  const [state, setState] = useState([]);

  const backdropImage = Boolean(backdrop)
    ? backdrop
    : `https://image.tmdb.org/t/p/w780/${state.backdrop_path}`;

  const url = `https://api.themoviedb.org/3/movie/${id}`;
  const config = {
    headers: Headers,
  };
  const fetchData = async () => {
    await fetch(url, config)
      .then(res => res.json())
      .then(data => {
        setState(data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{uri: backdropImage}} style={styles.backdrop} />
      <Title>{title}</Title>
      <Text>{categories}</Text>
      <Paragraph>{state.tagline}</Paragraph>
      <Paragraph>{state.overview}</Paragraph>
      <View style={styles.values}>
        <View style={styles.vote}>
          <Icon name="filmstrip" size={20} color="#9e9e9e" />
          <Text>{state.runtime} mins</Text>
        </View>

        <View style={styles.vote}>
          <Icon name="star" size={20} color="#f9d71c" />
          <Text>{state.vote_average}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backdrop: {
    aspectRatio: 780 / 439, //This is fixed but Image.getSize() could be used.
    width: '100%',
  },
  vote: {
    flexDirection: 'row',
  },
  values: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default Movie;
