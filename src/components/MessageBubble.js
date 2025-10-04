import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

  const getBubbleStyle = () => {
    const baseStyle = {
      maxWidth: '80%',
      marginVertical: 2,
      marginHorizontal: 15,
    };

    if (isCurrentUser) {
      return {
        ...baseStyle,
        alignSelf: 'flex-end',
        marginLeft: '20%',
      };
    } else {
      return {
        ...baseStyle,
        alignSelf: 'flex-start',
        marginRight: '20%',
      };
    }
  };

  const getMessageBubbleRadius = () => {
    const radius = 18;
    const smallRadius = 4;

    if (isCurrentUser) {
      return {
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: isNextMessageFromSameUser ? smallRadius : radius,
      };
    } else {
      return {
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        borderBottomLeftRadius: isNextMessageFromSameUser ? smallRadius : radius,
        borderBottomRightRadius: radius,
      };
    }
  };

  if (isCurrentUser) {
    return (
      <View style={getBubbleStyle()}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={[styles.messageBubble, getMessageBubbleRadius()]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.messageTextSent}>{message.message}</Text>
          <Text style={styles.messageTimeSent}>
            {formatTime(message.timestamp)}
          </Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={getBubbleStyle()}>
      <View style={[styles.messageBubbleReceived, getMessageBubbleRadius()]}>
        <Text style={styles.messageTextReceived}>{message.message}</Text>
        <Text style={styles.messageTimeReceived}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageBubbleReceived: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageTextSent: {
    color: 'white',
    fontSize: 16,
    lineHeight: 20,
  },
  messageTextReceived: {
    color: '#333',
    fontSize: 16,
    lineHeight: 20,
  },
  messageTimeSent: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  messageTimeReceived: {
    color: '#666',
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});

export default MessageBubble;