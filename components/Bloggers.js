import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  View,
} from 'react-native';
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
} from 'react-native-paper';
import axios from 'axios';
import AppIcon from '../assets/icon.png';
import Fave from '../assets/favicon.png';
import Colors from '../utils/colors';

const getData = async () => {
  const { data } = await axios.get(
    'https://w7-mariam-salah.herokuapp.com/posts',
  );
  return data;
};

export default function Bloggers() {
  const [blogger, setBlogger] = useState();
  useEffect(() => {
    if (!blogger) getData().then(setBlogger);
  }, [blogger]);

  return (
    <SafeAreaView style={styles.BloggersContainer}>
      <ScrollView style={styles.scrollView}>
        {blogger ? (
          <Card style={styles.card}>
            <Card.Title
              style={styles.header}
              title="Blogger"
              subtitle="Time Line"
              left={() => <Image source={AppIcon} style={styles.logo} />}
            />
            {blogger.map(({
              detail, img, title, p_date, id,
            }) => (
              <>
                <Card.Content>
                  <View style={styles.title}>
                    <Avatar.Text label={[title[0], title[1]]} size={24} style={{
                      width: 30,
                      height: 30,
                      marginRight: 15,
                      borderRadius: 50,
                      backgroundColor: `#${(0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)}`,
                    }} />
                    <Title>{title}</Title>
                  </View>
                </Card.Content>
                <Card.Cover style={styles.feed} source={{ uri: img }} />
                <Paragraph style={styles.detail}> {detail}   {p_date.split('T')[0]}</Paragraph>
              </>
            ))}
          </Card>
        ) : (
          <ActivityIndicator
            size={50}
            style={styles.limitation}
            animating={true}
            color={Colors.Primary}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  BloggersContainer: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
    flex: 1,
  },
  card: {
    // marginBottom: 100,
  },
  logo: {
    width: 50,
    height: 50,
  },
  limitation: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  feed: {
    marginBottom: 5,
    marginTop: 5,
    height: 250,
    opacity: 0.9,
  },
  header: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
    backgroundColor: '#FAFAFA',
  },
  detail: {
    marginBottom: 20,
    marginLeft: 20,
  },
});
