import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import Colors from '../utils/colors';

const screenWidth = Dimensions.get('screen').width;

const Footer = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'music', title: 'Music', icon: 'queue-music' },
    { key: 'albums', title: 'Albums', icon: 'album' },
  ]);

  const MusicRoute = () => <Text>Music</Text>;

  const AlbumsRoute = () => <Text>Albums</Text>;

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
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
