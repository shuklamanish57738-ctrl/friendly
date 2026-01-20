import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, TextInput } from 'react-native';
import { auth, firestore, storage } from '../firebase';

const ProfileScreen = () => {
  const [userData, setUserData] = useState({ username: '', followers: 0, profilePic: '' });
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      firestore().collection('users').doc(user.uid).onSnapshot(doc => {
        if (doc.exists) setUserData(doc.data());
      });
    }
  }, []);

  const updateProfile = async () => {
    const user = auth().currentUser;
    await firestore().collection('users').doc(user.uid).update({
      username: newUsername || userData.username,
      followers: userData.followers + 1, // उदाहरण: फॉलोअर्स बढ़ाएं
    });
    Alert.alert('Updated!');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Image source={{ uri: userData.profilePic || 'https://via.placeholder.com/100' }} style={{ width: 100, height: 100, borderRadius: 50 }} />
      <Text>Username: {userData.username}</Text>
      <Text>Followers: {userData.followers}</Text>
      <TextInput placeholder="New Username" value={newUsername} onChangeText={setNewUsername} style={{ borderWidth: 1, marginBottom: 10, padding: 10 }} />
      <Button title="Update Profile" onPress={updateProfile} />
    </View>
  );
};

export default ProfileScreen;
