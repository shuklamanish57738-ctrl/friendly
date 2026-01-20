import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text } from 'react-native';
import { firestore } from '../firebase';

const StoriesScreen = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    firestore().collection('stories').onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStories(data);
      // 24 घंटे बाद डिलीट: setTimeout(() => deleteStory(id), 86400000);
    });
  }, []);

  const renderStory = ({ item }) => (
    <View>
      <Image source={{ uri: item.imageUrl }} style={{ width: 100, height: 100 }} />
      <Text>{item.caption}</Text>
    </View>
  );

  return (
    <FlatList
      data={stories}
      renderItem={renderStory}
      keyExtractor={item => item.id}
      horizontal
    />
  );
};

export default StoriesScreen;
