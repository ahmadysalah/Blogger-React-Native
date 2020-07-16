import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import Colors from '../utils/colors';
import Bloggers from './Bloggers';

const screenWidth = Dimensions.get('screen').width;

const Footer = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'feed', title: 'Feeds', icon: 'account' },
    { key: 'new', title: 'New Blog', icon: 'album' },
  ]);

  const AlbumsRoute = () => <Text>Albums</Text>;

  const renderScene = BottomNavigation.SceneMap({
    feed: Bloggers,
    new: AlbumsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ width: screenWidth, backgroundColor: Colors.Primary }}
    />
  );
};

export default Footer;
