import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useChat } from '../context/ChatContext';
import UserAvatar from './UserAvatar';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const ChatArea = ({ selectedUser, onBack, currentUser }) => {
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  
  const { 
    messages, 
    onlineUsers, 
    typingUsers, 
    sendMessage, 
    setTyping 
  } = useChat();

  const userMessages = messages[selectedUser.phoneNumber] || [];
  const isOnline = onlineUsers.has(selectedUser.phoneNumber);
  const isUserTyping = typingUsers.has(selectedUser.phoneNumber);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (userMessages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [userMessages.length]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    try {
      sendMessage(selectedUser.phoneNumber, messageText.trim());
      setMessageText('');
      handleStopTyping();
      
      // Haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      Alert.alert('Error', 'Failed to send message');
    }
  };

  const handleTyping = (text) => {
    setMessageText(text);
    
    if (text.length > 0 && !isTyping) {
      setIsTyping(true);
      setTyping(selectedUser.phoneNumber, true);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      handleStopTyping();
    }, 2000);
  };

  const handleStopTyping = () => {
    if (isTyping) {
      setIsTyping(false);
      setTyping(selectedUser.phoneNumber, false);
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    
    return date.toLocaleDateString();
  };

  const renderMessage = ({ item, index }) => {
    const isLastMessage = index === userMessages.length - 1;
    const isNextMessageFromSameUser = 
      index < userMessages.length - 1 && 
      userMessages[index + 1].sender === item.sender;

    return (
      <MessageBubble
        message={item}
        isCurrentUser={item.sender === currentUser.phoneNumber}
        isLastMessage={isLastMessage}
        isNextMessageFromSameUser={isNextMessageFromSameUser}
      />
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        className="pt-3 pb-4 px-4"
      >
        <View className="flex-row items-center">
          <TouchableOpacity 
            className="p-1 mr-3"
            onPress={onBack}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <UserAvatar phoneNumber={selectedUser.phoneNumber} size={40} />
          
          <View className="flex-1 ml-3">
            <Text className="text-white text-base font-semibold">{selectedUser.phoneNumber}</Text>
            <Text className="text-white/80 text-xs mt-1">
              {isUserTyping ? 'typing...' : isOnline ? 'Online' : `Last seen ${formatTime(new Date())}`}
            </Text>
          </View>
          
          <View className="flex-row">
            <TouchableOpacity className="p-2 ml-1">
              <Ionicons name="call" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 ml-1">
              <Ionicons name="videocam" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Messages */}
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatListRef}
          data={userMessages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          className="flex-1"
          contentContainerStyle={{ paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }}
        />

        {/* Typing Indicator */}
        {isUserTyping && (
          <TypingIndicator phoneNumber={selectedUser.phoneNumber} />
        )}

        {/* Input Area */}
        <View className="bg-white px-4 py-3 border-t border-gray-200">
          <View className="flex-row items-end bg-gray-100 rounded-3xl px-4 py-2">
            <TextInput
              className="flex-1 text-base text-gray-800 py-2 max-h-24"
              placeholder="Type a message..."
              placeholderTextColor="#999"
              value={messageText}
              onChangeText={handleTyping}
              multiline
              maxLength={1000}
              returnKeyType="send"
              onSubmitEditing={handleSendMessage}
              blurOnSubmit={false}
            />
            
            <TouchableOpacity
              className={`w-9 h-9 rounded-full justify-center items-center ml-2 ${
                messageText.trim() ? 'bg-primary-500' : 'bg-transparent'
              }`}
              onPress={handleSendMessage}
              disabled={!messageText.trim()}
            >
              <Ionicons 
                name="send" 
                size={20} 
                color={messageText.trim() ? 'white' : '#999'} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatArea;