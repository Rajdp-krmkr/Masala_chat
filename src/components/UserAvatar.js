import React from 'react';
import { Text } from 'react-native';
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
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
      className="justify-center items-center shadow-md"
    >
      <Text 
        style={{ fontSize: size * 0.35 }}
        className="text-white font-bold"
      >
        {avatarText}
      </Text>
    </LinearGradient>
  );
};

export default UserAvatar;