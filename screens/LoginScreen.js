import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useApp } from '../context/AppContext';

export default function LoginScreen({ navigation }) {
  const { auth } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      auth.login(email);
      setLoading(false);
      navigation.replace('Main');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SkillSwap</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={onLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
      <View style={{ height: 8 }} />
      <TouchableOpacity style={[styles.button, styles.google]}> 
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>
      <View style={{ height: 8 }} />
      <TouchableOpacity style={[styles.button, styles.facebook]}> 
        <Text style={styles.buttonText}>Continue with Facebook</Text>
      </TouchableOpacity>
      <View style={{ height: 16 }} />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={{ color: '#2563eb' }}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 10, padding: 12, marginBottom: 12 },
  button: { backgroundColor: '#111827', padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#9ca3af', opacity: 0.7 },
  buttonText: { color: '#fff', fontWeight: '700' },
  google: { backgroundColor: '#db4437' },
  facebook: { backgroundColor: '#1877F2' },
});


