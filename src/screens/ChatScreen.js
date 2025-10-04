import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useChat } from '../context/ChatContext';
import UserList from '../components/UserList';
import ChatArea from '../components/ChatArea';

const ChatScreen = ({ navigation }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { currentUser } = useChat();

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleBackToUsers = () => {
    setSelectedUser(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {!selectedUser ? (
          <UserList 
            onUserSelect={handleUserSelect}
            currentUser={currentUser}
          />
        ) : (
          <ChatArea
            selectedUser={selectedUser}
            onBack={handleBackToUsers}
            currentUser={currentUser}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
  },
});

export default ChatScreen;