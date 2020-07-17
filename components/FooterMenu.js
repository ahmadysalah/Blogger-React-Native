import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import Colors from '../utils/colors';
import Bloggers from './Bloggers';
import NewBlogger from '../screen/NewBlogger';

const screenWidth = Dimensions.get('screen').width;

const Footer = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'feed', title: 'Feeds', icon: 'account' },
    { key: 'new', title: 'New Blog', icon: 'album' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    feed: Bloggers,
    new: NewBlogger,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{
        width: screenWidth,
        backgroundColor: Colors.Primary,
        position: 'relative',
      }}
    />
  );
};

export default Footer;
