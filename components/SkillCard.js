import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SkillCard({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.user}>{item.user}</Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
        <Text style={styles.rating}>★ {item.rating}</Text>
      </View>
      <Text style={styles.title}>{item.skill}</Text>
      <Text style={styles.desc}>{item.description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    marginRight: 12,
  },
  user: { fontWeight: '600', fontSize: 14 },
  location: { color: '#6b7280', fontSize: 12 },
  rating: { fontWeight: '700' },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  desc: { color: '#374151' },
});


