import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const UserAvatar = ({ phoneNumber, size = 40 }) => {
  const getAvatarText = (phone) => {
    const digits = phone.replace(/\D/g, '');
    return digits.slice(-2) || '??';
  };

  const getGradientColors = (phone) => {
    const colors = [
      ['#667eea', '#764ba2'],
      ['#f093fb', '#f5576c'],
      ['#4facfe', '#00f2fe'],
      ['#43e97b', '#38f9d7'],
      ['#fa709a', '#fee140'],
      ['#a8edea', '#fed6e3'],
      ['#ff9a9e', '#fecfef'],
      ['#ffecd2', '#fcb69f'],
    ];
    
    const hash = phone.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    return colors[Math.abs(hash) % colors.length];
  };

  const avatarText = getAvatarText(phoneNumber);
  const gradientColors = getGradientColors(phoneNumber);

  return (
    <LinearGradient
      colors={gradientColors}
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <Text style={[styles.avatarText, { fontSize: size * 0.35 }]}>
        {avatarText}
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserAvatar;