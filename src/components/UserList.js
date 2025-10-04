import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
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
        style={styles.userItem}
        onPress={() => onUserSelect(item)}
      >
        <View style={styles.userInfo}>
          <UserAvatar phoneNumber={item.phoneNumber} size={50} />
          
          <View style={styles.userDetails}>
            <View style={styles.userHeader}>
              <Text style={styles.userName}>{item.phoneNumber}</Text>
              {lastMessage && (
                <Text style={styles.messageTime}>
                  {formatTime(lastMessage.timestamp)}
                </Text>
              )}
            </View>
            
            <View style={styles.statusContainer}>
              {lastMessage ? (
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {lastMessage.sender === currentUser.phoneNumber ? 'You: ' : ''}
                  {lastMessage.message}
                </Text>
              ) : (
                <Text style={styles.statusText}>
                  {isOnline ? 'Online' : 'Last seen recently'}
                </Text>
              )}
            </View>
          </View>
          
          <View style={styles.userActions}>
            {isOnline && <View style={styles.onlineIndicator} />}
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </View>
        </View>
      </TouchableOpacity>
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
          <View style={styles.headerLeft}>
            <UserAvatar phoneNumber={currentUser.phoneNumber} size={40} />
            <View style={styles.currentUserInfo}>
              <Text style={styles.headerTitle}>Phone Chat</Text>
              <Text style={styles.headerSubtitle}>{currentUser.phoneNumber}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerButton}>
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
        style={styles.userList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Empty State */}
      {users.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="people-outline" size={60} color="#ccc" />
          <Text style={styles.emptyTitle}>No users available</Text>
          <Text style={styles.emptySubtitle}>
            Demo users will appear here automatically
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  currentUserInfo: {
    marginLeft: 12,
    flex: 1,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
  },
  userList: {
    flex: 1,
  },
  userItem: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDetails: {
    flex: 1,
    marginLeft: 12,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  messageTime: {
    fontSize: 12,
    color: '#666',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  userActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4caf50',
    marginRight: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 82,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default UserList;