import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useApp, mockSkills } from '../context/AppContext';

export default function BookingScreen() {
  const route = useRoute();
  const { bookingApi, bookings, reviewApi } = useApp();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const skillId = route.params?.skillId;
  const skill = mockSkills.find((s) => s.id === skillId);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {skill && (
        <View style={styles.card}>
          <Text style={styles.title}>{skill.skill}</Text>
          <Text style={{ color: '#374151' }}>{skill.description}</Text>
        </View>
      )}
      <Text style={styles.section}>Book a session</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TextInput placeholder="YYYY-MM-DD" value={date} onChangeText={setDate} style={[styles.input, { flex: 1 }]} />
        <TextInput placeholder="HH:mm" value={time} onChangeText={setTime} style={[styles.input, { width: 120 }]} />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => bookingApi.book({ skillId, date, time })}>
        <Text style={styles.buttonText}>Book</Text>
      </TouchableOpacity>

      <Text style={styles.section}>My Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={(b) => b.id}
        renderItem={({ item }) => (
          <View style={styles.bookingItem}>
            <Text style={{ fontWeight: '700' }}>{mockSkills.find((s) => s.id === item.skillId)?.skill}</Text>
            <Text>{item.date} {item.time} • {item.status}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No bookings yet.</Text>}
      />

      <Text style={styles.section}>Rate your last booking</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TextInput placeholder="Rating (1-5)" value={rating} onChangeText={setRating} style={[styles.input, { width: 120 }]} keyboardType="numeric" />
        <TextInput placeholder="Review" value={review} onChangeText={setReview} style={[styles.input, { flex: 1 }]} />
      </View>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#10b981' }]} onPress={() => {
        if (skillId) {
          reviewApi.addReview({ skillId, rating: Number(rating), text: review });
          setRating(''); setReview('');
        }
      }}>
        <Text style={styles.buttonText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6 },
  title: { fontSize: 18, fontWeight: '800', marginBottom: 4 },
  section: { marginTop: 12, marginBottom: 8, fontWeight: '800' },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 10, padding: 10, marginBottom: 8 },
  button: { backgroundColor: '#2563eb', padding: 12, borderRadius: 10, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#fff', fontWeight: '700' },
  bookingItem: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 8 },
});


