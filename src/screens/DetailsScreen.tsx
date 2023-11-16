import { ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/Store'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import ImageBackgroundInfo from '../components/ImageBackgroundInfo'
import PaymentFooter from '../components/PaymentFooter'

const DetailsScreen = ({ navigation, route }: any) => {
  const ItemOfIndex = useStore((state: any) =>
    route.params.type == "Coffee" ? state.CoffeeList : state.BeansList)
  [route.params.index]
  const removeFromFavoriteList = useStore(
    (state: any) => state.removeFromFavoriteList,
    );
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);


  const [fullDesc, setFullDesc] = useState(false);
  const [price, setPrice] = useState(ItemOfIndex.prices[0]);

  const backHandler = () => {
    navigation.pop()
  }

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? removeFromFavoriteList(type, id) : addToFavoriteList(type, id);
  }

  const buttonPressHandler=(ItemOfIndex:any)=>{
    const filteredPrices = ItemOfIndex.prices.filter((item:any) => item.price == price.price);
    const FilteredItem = {
      ...ItemOfIndex,
      prices: filteredPrices,
    };
    console.log("Filtered",filteredPrices," ",FilteredItem);
    addToCart(ItemOfIndex)
    calculateCartPrice();
  }

  const addToCarthandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{...price, quantity: 1}],
    });
    calculateCartPrice();
    navigation.navigate('Cart');
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewStyle}>
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={ItemOfIndex.imagelink_portrait}
          type={ItemOfIndex.type}
          id={ItemOfIndex.id}
          favourite={ItemOfIndex.favourite}
          name={ItemOfIndex.name}
          special_ingredient={ItemOfIndex.special_ingredient}
          ingredients={ItemOfIndex.ingredients}
          average_rating={ItemOfIndex.average_rating}
          ratings_count={ItemOfIndex.ratings_count}
          roasted={ItemOfIndex.roasted}
          BackHandler={backHandler}
          ToggleFavourite={ToggleFavourite}
        />
        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {fullDesc ?
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(!fullDesc);
              }}>
              <Text style={styles.DescriptionText}>
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback> :
            <TouchableOpacity onPress={() => setFullDesc(!fullDesc)}>
              <Text numberOfLines={3} style={styles.DescriptionText}>{ItemOfIndex.description}</Text>
            </TouchableOpacity>
          }
          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOutContainer}>
            {ItemOfIndex.prices.map((item: any) => (
              <TouchableOpacity key={item.size} onPress={() => {setPrice(item) }}
                style={[styles.SizeBox, {
                  borderColor: item.size == price.size ? COLORS.primaryOrangeHex : COLORS.primaryDarkGreyHex
                }]} >
                <Text style={[styles.SizeText, {
                  color:
                    item.size == price.size
                      ? COLORS.primaryOrangeHex
                      : COLORS.secondaryLightGreyHex,
                  fontSize:
                    ItemOfIndex.type == 'Bean'
                      ? FONTSIZE.size_14
                      : FONTSIZE.size_16,
                }]}>{item.size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter  price={price}
          buttonTitle="Add to Cart" buttonPressHandler={() => {
            addToCarthandler({
              id: ItemOfIndex.id,
              index: ItemOfIndex.index,
              name: ItemOfIndex.name,
              roasted: ItemOfIndex.roasted,
              imagelink_square: ItemOfIndex.imagelink_square,
              special_ingredient: ItemOfIndex.special_ingredient,
              type: ItemOfIndex.type,
              price: price,
            });
          }}/>
      </ScrollView>
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  ScrollViewStyle: {
    flexGrow: 1,
    justifyContent:'space-between'
  },
  FooterInfoArea: {
    padding: SPACING.space_20
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  SizeOutContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  }
})