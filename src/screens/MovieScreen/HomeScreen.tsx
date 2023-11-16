import { ActivityIndicator, Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../theme/theme'
import InputHeader from '../../components/InputHeader'
import { baseImagePath, nowPlayingMovies, popularMovies, upComingMovies } from '../../api/apicalls'
import SubMovieCard from '../../components/SubMovieCard'
import MovieCard from '../../components/MovieCard'
import HeaderBar from '../../components/HeaderBar'
import BottomSheet from '../../components/BottomSheet'

const getPlayingMoviesList = async () => {
  try {
    console.log(nowPlayingMovies)
    const responses = await fetch(nowPlayingMovies)
    let json = await responses.json()
    return json
  } catch (error) {
    console.log("something went wrong", error)
  }
}

const getUpcomingMoviesList = async () => {
  try {
    console.log(upComingMovies)
    const responses = await fetch(upComingMovies)
    let json = await responses.json()
    return json
  } catch (error) {
    console.log("something went wrong", error)
  }
}

const getPopularMoviesList = async () => {
  try {
    console.log(popularMovies)
    const responses = await fetch(popularMovies)
    let json = await responses.json()
    return json
  } catch (error) {
    console.log("something went wrong", error)
  }
}

const { width, height } = Dimensions.get('screen')

const HomeScreen = ({ navigation }: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any>(undefined)
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined)
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined)
  const bottomSheet: any = useRef();

  useEffect(() => {
    (async () => {
      let tempNowPlaying = await getPlayingMoviesList();
      console.log("temp==>",tempNowPlaying)
      setNowPlayingMoviesList([
        { id: 'dummy1' },
        ...tempNowPlaying.results,
        { id: 'dummy2' },
      ]);

      let tempPopular = await getPopularMoviesList();
      console.log("temp==>",tempPopular)
      setPopularMoviesList(tempPopular.results);

      let tempUpcoming = await getUpcomingMoviesList();
      console.log("temp==>",tempUpcoming)
      setUpcomingMoviesList(tempUpcoming.results);
    })();
  }, [])

  const searchMoviesFunction = () => {
    navigation.navigate('Search')
  }

  const openHanlder = useCallback(() => {
    bottomSheet.current.expand();
  }, []);

  if (nowPlayingMoviesList == undefined &&
    nowPlayingMoviesList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null &&
    upcomingMoviesList == undefined &&
    upcomingMoviesList == null) {
    return (
      <ScrollView bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />
        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={COLORS.primaryOrangeHex} size={'large'} />
        </View>
      </ScrollView>)
  }



  return (
    <ScrollView bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainer}>
      {/* <StatusBar hidden /> */}
      <HeaderBar onPress={openHanlder} title={"Movies Tickets"} openProfile={() => navigation.openDrawer()} />
      <View style={styles.InputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction} />
      </View>
      <Text style={styles.text}>Now Playing</Text>
      <FlatList
        horizontal
        data={nowPlayingMoviesList}
        keyExtractor={(item: any) => item.id}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        contentContainerStyle={styles.containerGap36}
        snapToInterval={width * 0.7 + 36}
        renderItem={({ item, index }) => {

          if (!item.original_title) {
            return <View
              style={{
                width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
              }}></View>
          }

          return (
            <MovieCard
              shouldMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push('MovieDetailsScreen', { movieid: item.id })
              }}
              cardWidth={width * 0.7}
              isFirst={index == 0 ? true : false}
              isLast={index == upcomingMoviesList?.length - 1 ? true : false}
              title={item.original_title}
              imagePath={baseImagePath('w780', item.poster_path)}
              genre={item?.genre_ids?.slice(1, 4)}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
            />
          )
        }} />
      <Text style={styles.text}>Popular</Text>
      <FlatList
        horizontal
        data={popularMoviesList}
        keyExtractor={(item: any) => item.id}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({ item, index }) => (
          <SubMovieCard
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetailsScreen', { movieid: item.id })
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == upcomingMoviesList?.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )} />
      <Text style={styles.text}>Upcoming </Text>
      <FlatList
        horizontal
        data={upcomingMoviesList}
        keyExtractor={(item: any) => item.id}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({ item, index }) => (
          <SubMovieCard
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetailsScreen', { movieid: item.id })
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == upcomingMoviesList?.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )} />
      <BottomSheet ref={bottomSheet}
        activeHeight={height * 0.5}
        backgroundColor={'#FFF'}
        backDropColor={'#FFF'}
      >
      </BottomSheet>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.Black
  },
  InputHeaderContainer: {
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_12
  },
  text: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
    paddingHorizontal: SPACING.space_36,
    paddingVertical: SPACING.space_28,
  },
  containerGap36: {
    gap: SPACING.space_36
  }
})

export default HomeScreen
