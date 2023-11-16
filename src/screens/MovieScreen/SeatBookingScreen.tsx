import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, FlatList, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../../components/AppHeader';
import CustomIcon from '../../components/CustomIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../../store/Store';

const timeArray: string[] = [
  '10:30',
  '12:30',
  '14:30',
  '15:00',
  '19:30',
  '21:00',
];


const generateDate = () => {
  const date = new Date()
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()]
    }
    weekdays.push(tempDate)
  }
  return weekdays
}

const generateSeats = () => {
  let numRow = 8
  let numColumn = 3
  let rowArray = []
  let start = 1
  let reachnine = false

  for (let i = 0; i < numRow; i++) {
    let colArray = []
    for (let j = 0; j < numColumn; j++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false
      }
      colArray.push(seatObject)
      start++
    }
    if (i == 3) {
      numColumn += 2
    }
    if (numColumn < 9 && !reachnine) {
      numColumn += 2
    } else {
      reachnine = true
      numColumn -= 2
    }
    rowArray.push(colArray)
  }
  return rowArray
}

const SeatBookingScreen = ({ navigation, route }: any) => {
  const [dateArray, setDateArray] = useState<any[]>(generateDate())
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState<number>(0);
  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();
  const addTickets = useStore((state: any) => state.addTickets)

  const selectSeat = (index: number, subindex: number, num: number) => {
    if (!twoDSeatArray[index][subindex].taken) {
      let array: any = [...selectedSeatArray]
      let temp: any = [...twoDSeatArray]
      temp[index][subindex].selected = !temp[index][subindex].selected
      if (!array.includes(num)) {
        array.push(num)
        setSelectedSeatArray(array)
      } else {
        const tempindex = array.indexOf(num)
        if (tempindex > -1) {
          array.splice(tempindex, 1)
          setSelectedSeatArray(temp)
        }
      }
      setPrice(array.length * 5.0);
      setTwoDSeatArray(temp);
    }
  }

  const bookSeats=async()=>{
    if (
      selectedSeatArray.length !== 0 &&
      timeArray[selectedTimeIndex] !== undefined &&
      dateArray[selectedDateIndex] !== undefined
    ) {
      try {
        let data={
          seatArray: selectedSeatArray,
          time: timeArray[selectedTimeIndex],
          date: dateArray[selectedDateIndex],
          ticketImage: route.params.PosterImage,
        }
        await addTickets(data)
      } catch (error) {
        console.log("something went wrong",error)
      }
      navigation.navigate('Ticket', {
        seatArray: selectedSeatArray,
        time: timeArray[selectedTimeIndex],
        date: dateArray[selectedDateIndex],
        ticketImage: route.params.PosterImage,
      });
      
    }else{
      ToastAndroid.showWithGravity(
        'Please Select Seats, Date and Time of the Show',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  }
  return (
    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <View>
        <ImageBackground
          source={{
            uri: route.params?.BgImage,
          }}
          style={styles.imageBG}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="close"
                header={''}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <Text style={styles.screenText}>Screen this side</Text>
      </View>
      <View style={styles.containerGap20}>
        {twoDSeatArray.map((item: any, index: any) => {
          return (<View key={index} style={styles.seatRow}>
            {item?.map((item: any, subindex: any) => (
              <TouchableOpacity key={item.number}
                onPress={() => {
                  selectSeat(index, subindex, item.number)
                }}>
                <CustomIcon name='seat' size={FONTSIZE.size_16}
                  style={[styles.seatIcon,
                  item.taken ? { color: COLORS.Grey } : {},
                  item.selected ? { color: COLORS.Orange } : {}]} />
              </TouchableOpacity>
            ))}
          </View>)
        })}
      </View>
      <View style={styles.seatRadioContainer}>
        <View style={styles.radioContainer}>
          <CustomIcon name="seat" style={styles.radioIcon} />
          <Text style={styles.radioText}>Available</Text>
        </View>
        <View style={styles.radioContainer}>
          <CustomIcon
            name="seat"
            style={[styles.radioIcon, { color: COLORS.Grey }]}
          />
          <Text style={styles.radioText}>Taken</Text>
        </View>
        <View style={styles.radioContainer}>
          <CustomIcon
            name="seat"
            style={[styles.radioIcon, { color: COLORS.Orange }]}
          />
          <Text style={styles.radioText}>Selected</Text>
        </View>
      </View>
      <View style={{ marginVertical: SPACING.space_24 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={dateArray}
          keyExtractor={(item) => item.date}
          contentContainerStyle={{ gap: SPACING.space_24 }}
          renderItem={({ item, index }: any) => {
            return (
              <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
                <View style={[
                  styles.dateContainer,
                  index == 0
                    ? { marginLeft: SPACING.space_24 }
                    : index == dateArray.length - 1
                      ? { marginRight: SPACING.space_24 }
                      : {},
                  index == selectedDateIndex
                    ? { backgroundColor: COLORS.Orange }
                    : {},
                ]}>
                  <Text style={styles.dateText}>{item.date}</Text>
                  <Text style={styles.dayText}>{item.day}</Text>

                </View>
              </TouchableOpacity >
            )
          }}
        />
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={timeArray}
        keyExtractor={(item) => item}
        contentContainerStyle={{ gap: SPACING.space_24 }}
        renderItem={({ item, index }: any) => {
          return (
            <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
              <View style={[
                styles.timeContainer,
                index == 0
                  ? { marginLeft: SPACING.space_24 }
                  : index == dateArray.length - 1
                    ? { marginRight: SPACING.space_24 }
                    : {},
                index == selectedTimeIndex
                  ? { backgroundColor: COLORS.Orange }
                  : {},
              ]}>
                <Text style={styles.timeText}>{item}</Text>

              </View>
            </TouchableOpacity >
          )
        }}
      />
      <View style={styles.buttonPriceContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalPriceText}>Total Price</Text>
          <Text style={styles.price}>$ {price}.00</Text>
        </View>
        <TouchableOpacity onPress={bookSeats}>
          <Text style={styles.buttonText}>Buy Tickets</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default SeatBookingScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black,
    flex: 1
  },
  imageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  cardImage: {
    width: '60%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  screenText: {
    textAlign: 'center',
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.WhiteRGBA32
  },
  containerGap20: {
    gap: SPACING.space_20,
  },
  seatRow: {
    flexDirection: 'row',
    gap: SPACING.space_20,
    justifyContent: 'center',
  },
  seatIcon: {
    color: COLORS.White,
  },
  seatRadioContainer: {
    flexDirection: 'row',
    marginTop: SPACING.space_30,
    marginBottom: SPACING.space_20,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  radioContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center'
  },
  radioIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White
  },
  radioText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White
  },
  dateContainer: {
    width: SPACING.space_10 * 7,
    height: SPACING.space_10 * 10,
    borderRadius: SPACING.space_10 * 10,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
  dayText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  timeContainer: {
    paddingVertical: SPACING.space_8,
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA50,
    paddingHorizontal: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_25,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  buttonPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_24,
    paddingBottom: SPACING.space_24,
    marginTop:SPACING.space_20,
  },
  priceContainer: {
    alignItems: 'center',
  },
  totalPriceText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
  },
  price: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    backgroundColor: COLORS.Orange,
  },
})