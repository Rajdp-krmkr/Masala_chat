import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState({});
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [typingUsers, setTypingUsers] = useState(new Set());

  // Demo users
  const demoUsers = [
    { id: '1', phoneNumber: '+1-555-0101', online: true },
    { id: '2', phoneNumber: '+1-555-0102', online: false },
    { id: '3', phoneNumber: '+1-555-0103', online: true },
    { id: '4', phoneNumber: '+1-555-0104', online: false },
    { id: '5', phoneNumber: '+1-555-0105', online: true },
  ];

  // Initialize demo data
  const initDemoData = (userPhone) => {
    const demoMessages = {
      '+1-555-0101': [
        {
          id: '1',
          sender: '+1-555-0101',
          message: 'Hey there! How are you doing today?',
          timestamp: new Date(Date.now() - 300000),
          type: 'received'
        },
        {
          id: '2',
          sender: userPhone,
          message: 'Hi! I\'m doing great, thanks for asking!',
          timestamp: new Date(Date.now() - 240000),
          type: 'sent'
        },
        {
          id: '3',
          sender: '+1-555-0101',
          message: 'That\'s awesome! Want to chat more?',
          timestamp: new Date(Date.now() - 180000),
          type: 'received'
        }
      ],
      '+1-555-0102': [
        {
          id: '4',
          sender: userPhone,
          message: 'Hello! Nice to meet you.',
          timestamp: new Date(Date.now() - 600000),
          type: 'sent'
        }
      ],
      '+1-555-0103': [
        {
          id: '5',
          sender: '+1-555-0103',
          message: 'Welcome to the chat app! 🎉',
          timestamp: new Date(Date.now() - 120000),
          type: 'received'
        }
      ]
    };
    setMessages(demoMessages);
  };

  // Phone number validation
  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phoneNumber.replace(/\s/g, ''));
  };

  // Authentication
  const authenticate = (phoneNumber) => {
    if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
      throw new Error('Invalid phone number');
    }

    const user = {
      id: Date.now().toString(),
      phoneNumber: phoneNumber.trim()
    };

    setCurrentUser(user);
    
    // Filter out current user from demo users
    const filteredUsers = demoUsers.filter(u => u.phoneNumber !== phoneNumber);
    setUsers(filteredUsers);
    
    // Initialize demo data
    initDemoData(phoneNumber);

    // Simulate some users being online
    setTimeout(() => {
      setOnlineUsers(new Set(['+1-555-0101', '+1-555-0103', '+1-555-0105']));
    }, 1000);

    return user;
  };

  // Send message
  const sendMessage = (targetPhone, messageText) => {
    const messageObj = {
      id: Date.now().toString(),
      sender: currentUser.phoneNumber,
      message: messageText,
      timestamp: new Date(),
      type: 'sent'
    };

    setMessages(prev => ({
      ...prev,
      [targetPhone]: [...(prev[targetPhone] || []), messageObj]
    }));

    // Simulate response if user is online
    if (onlineUsers.has(targetPhone)) {
      simulateResponse(targetPhone);
    }

    return messageObj;
  };

  // Simulate typing
  const setTyping = (targetPhone, isTyping) => {
    if (isTyping) {
      setTypingUsers(prev => new Set([...prev, targetPhone]));
    } else {
      setTypingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(targetPhone);
        return newSet;
      });
    }
  };

  // Simulate response from other user
  const simulateResponse = (targetPhone) => {
    const responses = [
      "That's interesting! 🤔",
      "I totally agree with you! 👍",
      "Tell me more about that!",
      "Sounds amazing! ✨",
      "I see what you mean 💭",
      "That's a great point! 💡",
      "Thanks for sharing! 🙏",
      "I hadn't thought of it that way 🤯",
      "Absolutely! 💯",
      "That makes perfect sense! ✅"
    ];

    // Show typing indicator
    setTyping(targetPhone, true);

    setTimeout(() => {
      // Hide typing indicator
      setTyping(targetPhone, false);

      // Add response message
      const responseMessage = {
        id: Date.now().toString(),
        sender: targetPhone,
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: 'received'
      };

      setMessages(prev => ({
        ...prev,
        [targetPhone]: [...(prev[targetPhone] || []), responseMessage]
      }));
    }, 1000 + Math.random() * 2000);
  };

  // Simulate user status changes
  useEffect(() => {
    if (users.length === 0) return;

    const interval = setInterval(() => {
      setOnlineUsers(prev => {
        const newOnlineUsers = new Set(prev);
        users.forEach(user => {
          if (Math.random() < 0.1) { // 10% chance per interval
            if (newOnlineUsers.has(user.phoneNumber)) {
              newOnlineUsers.delete(user.phoneNumber);
            } else {
              newOnlineUsers.add(user.phoneNumber);
            }
          }
        });
        return newOnlineUsers;
      });
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, [users]);

  const value = {
    currentUser,
    users,
    messages,
    onlineUsers,
    typingUsers,
    authenticate,
    sendMessage,
    setTyping,
    validatePhoneNumber
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};