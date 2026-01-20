import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import Video from 'react-native-video';
import { firestore } from '../firebase';

const ReelsScreen = () => {
  const [reels, setReels] = useState([]);

  useEffect(() => {
    firestore().collection('reels').onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), likes: 0 }));
      setReels(data);
    });
  }, []);

  const likeReel = (id) => {
    setReels(prev => prev.map(reel => reel.id === id ? { ...reel, likes: reel.likes + 1 } : reel));
  };

  const renderReel = ({ item }) => (
    <View style={{ marginBottom: 20 }}>
      <Video source={{ uri: item.videoUrl }} style={{ width: 300, height: 500 }} controls />
      <Text>{item.caption}</Text>
      <TouchableOpacity onPress={() => likeReel(item.id)}>
        <Text>Likes: {item.likes}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={reels}
      renderItem={renderReel}
      keyExtractor={item => item.id}
    />
  );
};

export default ReelsScreen;
