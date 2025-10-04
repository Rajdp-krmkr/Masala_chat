import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useChat } from '../context/ChatContext';
import UserAvatar from './UserAvatar';

const UserList = ({ onUserSelect, currentUser }) => {
  const { users, onlineUsers, messages } = useChat();

  const getLastMessage = (phoneNumber) => {
    const userMessages = messages[phoneNumber] || [];
    if (userMessages.length === 0) return null;
    return userMessages[userMessages.length - 1];
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    
    return date.toLocaleDateString();
  };

  const renderUser = ({ item }) => {
    const isOnline = onlineUsers.has(item.phoneNumber);
    const lastMessage = getLastMessage(item.phoneNumber);
    
    return (
      <TouchableOpacity
        className="bg-white px-5 py-4"
        onPress={() => onUserSelect(item)}
      >
        <View className="flex-row items-center">
          <UserAvatar phoneNumber={item.phoneNumber} size={50} />
          
          <View className="flex-1 ml-3">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-base font-semibold text-gray-800 flex-1">{item.phoneNumber}</Text>
              {lastMessage && (
                <Text className="text-xs text-gray-500">
                  {formatTime(lastMessage.timestamp)}
                </Text>
              )}
            </View>
            
            <View className="flex-row items-center">
              {lastMessage ? (
                <Text className="text-sm text-gray-500 flex-1" numberOfLines={1}>
                  {lastMessage.sender === currentUser.phoneNumber ? 'You: ' : ''}
                  {lastMessage.message}
                </Text>
              ) : (
                <Text className="text-sm text-gray-500">
                  {isOnline ? 'Online' : 'Last seen recently'}
                </Text>
              )}
            </View>
          </View>
          
          <View className="flex-row items-center">
            {isOnline && <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />}
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        className="pt-3 pb-5 px-5"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <UserAvatar phoneNumber={currentUser.phoneNumber} size={40} />
            <View className="ml-3 flex-1">
              <Text className="text-white text-lg font-semibold">Phone Chat</Text>
              <Text className="text-white/80 text-xs mt-1">{currentUser.phoneNumber}</Text>
            </View>
          </View>
          <View className="flex-row">
            <TouchableOpacity className="p-2">
              <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* User List */}
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-px bg-gray-100 ml-20" />}
      />

      {/* Empty State */}
      {users.length === 0 && (
        <View className="flex-1 justify-center items-center px-10">
          <Ionicons name="people-outline" size={60} color="#ccc" />
          <Text className="text-lg font-semibold text-gray-500 mt-5 mb-2">No users available</Text>
          <Text className="text-sm text-gray-400 text-center leading-5">
            Demo users will appear here automatically
          </Text>
        </View>
      )}
    </View>
  );
};

export default UserList;