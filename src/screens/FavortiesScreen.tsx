import { ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { COLORS, SPACING } from '../theme/theme'
import { useStore } from '../store/Store'
import EmptyListAnimation from '../components/EmptyListAnimation'
import HeaderBar from '../components/HeaderBar'
import FavoriteItemCard from '../components/FavoriteItemCard'


const FavortiesScreen = ({navigation}:any) => {
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const removeFromFavoriteList = useStore((state: any) => state.removeFromFavoriteList);
  const FavoritesList=useStore((state:any)=>state.FavoritesList)
  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? removeFromFavoriteList(type, id) : addToFavoriteList(type, id);
  }
  const tabBarHeight=useBottomTabBarHeight()
  return (
    <View style={styles.ScreenContainer}>
    <StatusBar backgroundColor={COLORS.primaryBlackHex} />
    <HeaderBar title="Favorites" />
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ScrollViewFlex}>
      <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
        <View style={styles.ItemContainer}>
          {FavoritesList.length == 0 ? <EmptyListAnimation title={"Favorites is Empty"} /> :
            <View style={styles.ListItemContainer}>
              {FavoritesList.map((item: any) => (
                <TouchableOpacity key={item.id}
                onPress={()=>{
                  navigation.navigate('Details',{
                    index:item.index,
                    id:item.id,
                    type:item.type
                  })
                }}>
                  <FavoriteItemCard
                    id={item.id}
                    imagelink_portrait={item.imagelink_portrait}
                    name={item.name}
                    special_ingredient={item.special_ingredient}
                    type={item.type}
                    ingredients={item.ingredients}
                    average_rating={item.average_rating}
                    ratings_count={item.ratings_count}
                    roasted={item.roasted}
                    description={item.description}
                    favourite={item.favourite}
                    ToggleFavouriteItem={ToggleFavourite}/>
                </TouchableOpacity>
              ))}
            </View>}
        </View>
      </View>
     
    </ScrollView>
  </View>
  )
}
const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1
  },
  ScrollViewFlex: {
    flexGrow: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1
  },
  ListItemContainer:{
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  }
})

export default FavortiesScreen
