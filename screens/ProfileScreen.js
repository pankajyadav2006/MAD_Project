import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';

export default function ProfileScreen() {
  const { user, setUser } = useApp();
  const [name, setName] = useState(user.name || '');
  const [bio, setBio] = useState(user.bio || '');
  const [skillsOffered, setSkillsOffered] = useState((user.skillsOffered || []).join(', '));
  const [skillsWanted, setSkillsWanted] = useState((user.skillsWanted || []).join(', '));

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.title}>My Profile</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Bio" value={bio} onChangeText={setBio} />
      <TextInput style={styles.input} placeholder="Skills Offered (comma separated)" value={skillsOffered} onChangeText={setSkillsOffered} />
      <TextInput style={styles.input} placeholder="Skills Wanted (comma separated)" value={skillsWanted} onChangeText={setSkillsWanted} />
      <TouchableOpacity style={styles.button} onPress={() => setUser({
        ...user,
        name,
        bio,
        skillsOffered: skillsOffered.split(',').map((s) => s.trim()).filter(Boolean),
        skillsWanted: skillsWanted.split(',').map((s) => s.trim()).filter(Boolean),
      })}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '800', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 10, padding: 10, marginBottom: 8 },
  button: { backgroundColor: '#111827', padding: 12, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
});


