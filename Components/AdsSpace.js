import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const AdsSpace = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const data = [
    { id: '1', image: require('../Images/Top.png') },
    { id: '2', image: require('../Images/Top.png') },
    { id: '3', image: require('../Images/Top.png') },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.advert} />
    </View>
  );

  return (
    <View style={styles.adsSpace}>
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  adsSpace: {
    marginTop: 10,
    marginBottom: 10,
  },
  slide: {
    width: Dimensions.get('window').width,
    height: 200, // Adjust the height as needed
  },
  advert: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    //borderRadius: 10
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'darkblue',
  },
});

export default AdsSpace;
