import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp, mockSkills } from '../context/AppContext';
import ChatBubble from '../components/ChatBubble';

export default function ChatScreen() {
  const { chats, chatApi } = useApp();
  const [text, setText] = useState('');
  const activeChat = useMemo(() => chats[0], [chats]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {activeChat ? (
        <>
          <Text style={styles.title}>{mockSkills.find((s) => s.id === activeChat.skillId)?.skill}</Text>
          <FlatList
            data={activeChat.messages}
            keyExtractor={(m) => m.id}
            renderItem={({ item }) => <ChatBubble message={item} />}
            contentContainerStyle={{ paddingVertical: 8 }}
          />
          <View style={styles.inputRow}>
            <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="Type a message" />
            <TouchableOpacity style={styles.send} onPress={() => { if (text.trim()) { chatApi.sendMessage({ skillId: activeChat.skillId, text }); setText(''); } }}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>Send</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>No chats yet. Book a session to start chatting.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 16, fontWeight: '800', marginBottom: 8 },
  inputRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 10, padding: 10 },
  send: { backgroundColor: '#2563eb', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10 },
});


