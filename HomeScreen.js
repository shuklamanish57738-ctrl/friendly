import React from 'react';
import { View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Go to Reels" onPress={() => navigation.navigate('Reels')} />
      <Button title="Go to Stories" onPress={() => navigation.navigate('Stories')} />
      <Button title="Go to Messages" onPress={() => navigation.navigate('Messages')} />
    </View>
  );
};

export default HomeScreen;
