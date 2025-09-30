import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import SkillCard from '../components/SkillCard';

export default function HomeScreen({ navigation }) {
  const { skills, reviewApi } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  const data = useMemo(() => {
    return skills.list.filter((s) =>
      (!search || s.skill.toLowerCase().includes(search.toLowerCase())) &&
      (!category || s.category.toLowerCase().includes(category.toLowerCase())) &&
      (!location || s.location.toLowerCase().includes(location.toLowerCase()))
    ).map((s) => {
      const avg = reviewApi.getAverage(s.id);
      return avg ? { ...s, rating: avg } : s;
    });
  }, [skills.list, search, category, location, reviewApi]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={styles.filters}>
        <TextInput placeholder="Search skill" style={styles.input} value={search} onChangeText={setSearch} />
        <TextInput placeholder="Category" style={styles.input} value={category} onChangeText={setCategory} />
        <TextInput placeholder="Location" style={styles.input} value={location} onChangeText={setLocation} />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SkillCard
            item={item}
            onPress={() => navigation.navigate('Bookings', { skillId: item.id })}
          />
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 24 }}>No skills found.</Text>}
      />
      <TouchableOpacity style={styles.bell} onPress={() => navigation.navigate('Notifications')}>
        <Text style={{ color: '#fff' }}>🔔</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  filters: { marginBottom: 8 },
  input: {
    borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 10, padding: 10, marginBottom: 8,
  },
  bell: {
    position: 'absolute', right: 16, bottom: 16, backgroundColor: '#111827', width: 56, height: 56,
    borderRadius: 28, alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 3 },
  },
});


