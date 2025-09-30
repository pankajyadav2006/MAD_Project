import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useApp } from '../context/AppContext';

export default function NotificationsScreen() {
  const { notifications } = useApp();
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={notifications}
        keyExtractor={(n) => n.id}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 8 }}>
            <Text style={{ fontWeight: '700' }}>{item.type}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No notifications</Text>}
      />
    </View>
  );
}


