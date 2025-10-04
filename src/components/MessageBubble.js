import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MessageBubble = ({ 
  message, 
  isCurrentUser, 
  isLastMessage, 
  isNextMessageFromSameUser 
}) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getBubbleClasses = () => {
    const baseClasses = "max-w-4/5 my-1 mx-4";
    
    if (isCurrentUser) {
      return `${baseClasses} self-end ml-1/5`;
    } else {
      return `${baseClasses} self-start mr-1/5`;
    }
  };

  const getBubbleRadiusClasses = () => {
    if (isCurrentUser) {
      return `rounded-2xl ${isNextMessageFromSameUser ? 'rounded-br-sm' : ''}`;
    } else {
      return `rounded-2xl ${isNextMessageFromSameUser ? 'rounded-bl-sm' : ''}`;
    }
  };

  if (isCurrentUser) {
    return (
      <View className={getBubbleClasses()}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          className={`px-4 py-3 shadow-sm ${getBubbleRadiusClasses()}`}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text className="text-white text-base leading-5">{message.message}</Text>
          <Text className="text-white/70 text-xs mt-1 self-end">
            {formatTime(message.timestamp)}
          </Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View className={getBubbleClasses()}>
      <View className={`bg-white px-4 py-3 shadow-sm ${getBubbleRadiusClasses()}`}>
        <Text className="text-gray-800 text-base leading-5">{message.message}</Text>
        <Text className="text-gray-500 text-xs mt-1 self-end">
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
};

export default MessageBubble;