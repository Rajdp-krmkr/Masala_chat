import React, { useState } from 'react';
import {
  View,
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
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
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

export default ChatScreen;