import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatBubble({ message }) {
  const isMine = message.mine;
  return (
    <View style={[styles.container, isMine ? styles.right : styles.left]}>
      <Text style={[styles.text, isMine ? styles.textRight : styles.textLeft]}>
        {message.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginVertical: 6,
  },
  left: { backgroundColor: '#e5e7eb', alignSelf: 'flex-start', borderBottomLeftRadius: 2 },
  right: { backgroundColor: '#2563eb', alignSelf: 'flex-end', borderBottomRightRadius: 2 },
  text: { fontSize: 14 },
  textLeft: { color: '#111827' },
  textRight: { color: '#fff' },
});


