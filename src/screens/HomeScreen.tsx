import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  useWindowDimensions,
  PermissionsAndroid,
  ActivityIndicator
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useStore } from '../store/Store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';
import BottomSheet from '../components/BottomSheet';
import Geocoder from 'react-native-geocoder';
import Geolocation from '@react-native-community/geolocation';

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    temp[data[i].name]++;
  }
  const categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeeList = (category: string, data: any) => {
  if (category == 'All') {
    return data;
  } else {
    let coffeelist = data.filter((item: any) => item.name == category);
    return coffeelist;
  }
};

const w = Dimensions.get('screen').width;

const HomeScreen = ({ navigation }: any) => {
  const CoffeeData = useStore((state: any) => state.CoffeeList);
  const BeansData = useStore((state: any) => state.BeansList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice)
  const [location,setLocation]:any=useState('')
  const { height } = useWindowDimensions();

  const requestLocationsPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION ,
        {
          title: 'Coffee App Location Permission',
          message:
            'Coffee App needs access to your Location ' ,
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await requestLocationsPermission();
  
        Geolocation.getCurrentPosition(async (info) => {
          console.log(info);
          try {
            var NY = {
              lat: info.coords.latitude,
              lng: info.coords.longitude,
            };
  
            const res = await Geocoder.geocodePosition(NY);
            console.log("res", res);
            setLocation(res[0].formattedAddress);
          } catch (err) {
            console.error(err);
          }
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if(CoffeeData==undefined&&BeansData==undefined&&CoffeeData==null&&BeansData==null){
    return (
      <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
          <ActivityIndicator size={"large"} color={COLORS.primaryOrangeHex}/>
      </View>
    )
  }
  

  const [searchText, setSearchText]: any = useState('');
  const bottomSheet: any = useRef();
  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeData),
  );

  const [categoryIndex, setCategoryIndex]: any = useState({
    index: 0,
    category: categories[0],
  });

  const [sortedCoffee, setSortedCoffee]: any = useState(
    getCoffeeList(categoryIndex.category, CoffeeData),
  );

  const handleSearch = (search: any) => {
    if (search == "") {
      ListView?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
    }
    setCategoryIndex({ index: 0, category: categories[0] })
    setSortedCoffee([
      ...CoffeeData.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      ),
    ]);
  }

  const CoffeCardAddToCart = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const ListView: any = useRef()
  const TabBarHegith = useBottomTabBarHeight();

  const openHanlder = useCallback(() => {
    bottomSheet.current.expand();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <HeaderBar onPress={openHanlder} title={location} openProfile={() => navigation.openDrawer()} />
        <Text style={styles.HeaderText}>
          Find the best {'\n'}coffee for you
        </Text>
        <View style={styles.InputView}>
          <TouchableOpacity onPress={() => handleSearch(searchText)}>
            <CustomIcon name="search"
              color={searchText ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} size={FONTSIZE.size_24} />
          </TouchableOpacity>
          <TextInput
            value={searchText}
            onChangeText={text => { setSearchText(text), handleSearch(text) }}
            placeholder="Find Your Coffee.."
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputView}
          />
          {searchText.length > 0 ? (
            <TouchableOpacity onPress={() => {
              setSearchText('')
              setSortedCoffee(CoffeeData)
            }}>
              <CustomIcon name="close" color={COLORS.primaryGreyHex} size={FONTSIZE.size_16} style={{ marginRight: SPACING.space_10 }} />
            </TouchableOpacity>
          ) : null}
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollView}>
          {categories.map((item: any, index: any) => (
            <TouchableOpacity
              onPress={() => {
                setCategoryIndex({ index: index, category: categories[index] });
                setSortedCoffee([...getCoffeeList(categories[index], CoffeeData)]);
                ListView?.current?.scrollToOffset(
                  {
                    animated: true,
                    offset: 0
                  }
                )
              }}
              style={styles.categoryName}
              key={index}>
              <Text
                style={[
                  styles.categoryText,
                  categoryIndex.index == index
                    ? { color: COLORS.primaryOrangeHex }
                    : {},
                ]}>
                {item}
              </Text>
              {categoryIndex.index == index ? (
                <View style={styles.activeCategory} />
              ) : null}
            </TouchableOpacity>
          ))}
        </ScrollView>
        <FlatList
          horizontal
          ListEmptyComponent={<View style={styles.NoDataView}>
            <Text style={styles.NoDataText}>No data avaliable</Text>
          </View>}
          ref={ListView}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={item => item.id}
          data={sortedCoffee}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => {
                navigation.push('Details', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                })
              }}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={CoffeCardAddToCart}
                />
              </TouchableOpacity>
            );
          }}
        />
        <Text style={styles.BeansTitle}>Coffee Beans</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.FlatListContainer, { marginBottom: TabBarHegith }]}
          keyExtractor={item => item.id}
          data={BeansData}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => {
                navigation.push('Details', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                })
              }}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={CoffeCardAddToCart}
                />
              </TouchableOpacity>
            );
          }}
        />

      </ScrollView>

      <BottomSheet ref={bottomSheet}
        activeHeight={height * 0.5}
        backgroundColor={'#FFF'}
        backDropColor={'#FFF'}
      >
      </BottomSheet>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollView: {
    flexGrow: 1,
  },
  HeaderText: {
    fontSize: FONTSIZE.size_28,
    color: COLORS.primaryWhiteHex,
    fontStyle: 'normal',
    fontFamily: FONTFAMILY.poppins_semibold,
    paddingLeft: SPACING.space_30,
  },
  InputView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.primaryDarkGreyHex,
    width: w - 40,
    alignSelf: 'center',
    marginTop: 15,
    paddingLeft: SPACING.space_15,
  },
  TextInputView: {
    marginLeft: SPACING.space_10,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
    flex: 1,
  },
  categoryScrollView: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
    marginTop: SPACING.space_20,
  },
  categoryName: {
    marginHorizontal: SPACING.space_20,
  },
  categoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  activeCategory: {
    height: SPACING.space_8,
    width: 'auto',
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  FlatListContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
  },
  BeansTitle: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_24,
    marginLeft: SPACING.space_15,
    marginTop: SPACING.space_10
  },
  NoDataView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_30 * 0.32
  },
  NoDataText: {
    color: COLORS.primaryLightGreyHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    fontWeight: '500'
  }
});
