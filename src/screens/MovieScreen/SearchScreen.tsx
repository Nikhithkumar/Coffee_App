import { FlatList, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SPACING } from '../../theme/theme'
import SubMovieCard from '../../components/SubMovieCard'
import { baseImagePath, searchMovies } from '../../api/apicalls'
import InputHeader from '../../components/InputHeader'

const { width, height } = Dimensions.get('screen')

const SearchScreen = ({ navigation }: any) => {
  const [searchList, setSearchList]: any = useState([])

  const searchMoviesFunction = async (name: string) => {
    try {
      const responses = await fetch(searchMovies(name))
      const json = await responses.json()
      setSearchList(json.results)
      return json
    } catch (error) {
      console.log("something went wrong", error)
    }
  }
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={searchList}
        keyExtractor={(item: any) => item.id}
        bounces={false}
        ListHeaderComponent={() => (
          <View style={styles.InputHeaderContainer}>
            <InputHeader searchFunction={searchMoviesFunction} />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({ item, index }) => (
          <SubMovieCard
            shouldMarginatedAtEnd={false}
            shouldMarginatedAround={true}
            cardFunction={() => {
              navigation.push('MovieDetailsScreen', { movieid: item.id })
            }}
            cardWidth={(width / 2)-SPACING.space_12*2}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  InputHeaderContainer: {
    display:'flex',
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_12
  },
  containerGap36: {
    alignItems:'center'
  }
})

export default SearchScreen
