import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={onBack}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <UserAvatar phoneNumber={selectedUser.phoneNumber} size={40} />
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{selectedUser.phoneNumber}</Text>
            <Text style={styles.userStatus}>
              {isUserTyping ? 'typing...' : isOnline ? 'Online' : `Last seen ${formatTime(new Date())}`}
            </Text>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="call" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="videocam" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Messages */}
      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatListRef}
          data={userMessages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
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
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
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
              style={[
                styles.sendButton,
                messageText.trim() ? styles.sendButtonActive : styles.sendButtonInactive
              ]}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  userStatus: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 5,
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 10,
  },
  inputContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: '#667eea',
  },
  sendButtonInactive: {
    backgroundColor: 'transparent',
  },
});

export default ChatArea;