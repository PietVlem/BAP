import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default function NewMeetingScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>123</Text>
    </ScrollView>
  );
}

NewMeetingScreen.navigationOptions = {
  title: 'New meeting',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
