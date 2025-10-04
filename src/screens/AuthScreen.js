import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useChat } from '../context/ChatContext';

const AuthScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { authenticate } = useChat();

  const handleAuthenticate = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter a phone number');
      return;
    }

    setLoading(true);
    
    try {
      await authenticate(phoneNumber);
      navigation.replace('Chat');
    } catch (error) {
      Alert.alert('Error', error.message || 'Invalid phone number format');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      className="flex-1"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center items-center px-8">
          {/* Header */}
          <View className="items-center mb-12">
            <View className="w-24 h-24 rounded-full bg-white/20 justify-center items-center mb-5">
              <Ionicons name="chatbubbles" size={60} color="white" />
            </View>
            <Text className="text-3xl font-bold text-white mb-2">Phone Chat</Text>
            <Text className="text-base text-white/80 text-center leading-6">
              Connect with friends using just your phone number
            </Text>
          </View>

          {/* Input Section */}
          <View className="w-full mb-10">
            <View className="flex-row items-center bg-white rounded-3xl px-5 py-4 mb-5 shadow-lg">
              <Ionicons 
                name="call-outline" 
                size={20} 
                color="#667eea" 
                className="mr-3"
              />
              <TextInput
                className="flex-1 text-base text-gray-800"
                placeholder="+1 (555) 123-4567"
                placeholderTextColor="#999"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                autoFocus
                returnKeyType="done"
                onSubmitEditing={handleAuthenticate}
              />
            </View>

            <TouchableOpacity
              className={`bg-white/20 rounded-3xl py-4 px-8 flex-row items-center justify-center border-2 border-white/30 ${loading ? 'opacity-60' : ''}`}
              onPress={handleAuthenticate}
              disabled={loading}
            >
              <Text className="text-white text-base font-semibold mr-3">
                {loading ? 'Connecting...' : 'Start Chatting'}
              </Text>
              {!loading && (
                <Ionicons name="arrow-forward" size={20} color="white" />
              )}
            </TouchableOpacity>
          </View>

          {/* Demo Info */}
          <View className="bg-white/10 rounded-2xl p-5 w-full items-center">
            <Text className="text-white text-lg font-semibold mb-3">Demo Mode</Text>
            <Text className="text-white/80 text-sm text-center mb-4 leading-5">
              Enter any phone number to try the app with demo users
            </Text>
            <View className="items-start">
              <Text className="text-white/90 text-xs mb-1">• +1-555-0101 (Online)</Text>
              <Text className="text-white/90 text-xs mb-1">• +1-555-0102 (Offline)</Text>
              <Text className="text-white/90 text-xs mb-1">• +1-555-0103 (Online)</Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default AuthScreen;