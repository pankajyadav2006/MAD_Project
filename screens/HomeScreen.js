import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import SkillCard from '../components/SkillCard';

const categories = ['All', 'Music', 'Design', 'Language', 'Fitness', 'Technology', 'Business', 'Arts'];

export default function HomeScreen({ navigation }) {
  const { skills, reviewApi } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [location, setLocation] = useState('');

  const data = useMemo(() => {
    return skills.list.filter((s) =>
      (!search || s.skill.toLowerCase().includes(search.toLowerCase()) || s.user.toLowerCase().includes(search.toLowerCase())) &&
      (selectedCategory === 'All' || s.category === selectedCategory) &&
      (!location || s.location.toLowerCase().includes(location.toLowerCase()))
    ).map((s) => {
      const avg = reviewApi.getAverage(s.id);
      return avg ? { ...s, rating: avg } : s;
    });
  }, [skills.list, search, selectedCategory, location, reviewApi]);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#f9fafb' }}>
      <Text style={styles.header}>Discover Skills</Text>
      <View style={styles.filters}>
        <TextInput 
          placeholder="Search skills or teachers..." 
          style={styles.input} 
          value={search} 
          onChangeText={setSearch} 
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextActive
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TextInput 
          placeholder="Filter by location..." 
          style={styles.input} 
          value={location} 
          onChangeText={setLocation} 
        />
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
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 16,
  },
  filters: { marginBottom: 16 },
  input: {
    borderWidth: 1, 
    borderColor: '#e5e7eb', 
    borderRadius: 12, 
    padding: 12, 
    marginBottom: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  categoryScroll: {
    marginBottom: 12,
  },
  categoryChip: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#2563eb',
  },
  categoryText: {
    color: '#6b7280',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#fff',
  },
  bell: {
    position: 'absolute', 
    right: 16, 
    bottom: 16, 
    backgroundColor: '#2563eb', 
    width: 56, 
    height: 56,
    borderRadius: 28, 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#000', 
    shadowOpacity: 0.2, 
    shadowRadius: 8, 
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
});


