import React from 'react';
import {
  StyleSheet, Text, View, Footer, Anchor,
} from 'react-native';

export default function FooterMenue() {
  return (
        <Footer background="brand" pad="medium">
        <Text>Copyright</Text>
        <Anchor label="About" />
      </Footer>
  );
}

const styles = StyleSheet.create({});
