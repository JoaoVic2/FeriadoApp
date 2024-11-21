import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function App() {
  const [year, setYear] = useState('');
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHolidays = async () => {
    if (!year) {
      Alert.alert('Erro', 'Por favor, insira um ano válido.');
      return;
    }

    setLoading(true);
    setHolidays([]);
    try {
      const response = await axios.get(`https://brasilapi.com.br/api/feriados/v1/${year}`);
      setHolidays(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar os feriados. Verifique o ano ou tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulta de Feriados</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite um ano (ex: 2024)"
        keyboardType="numeric"
        value={year}
        onChangeText={setYear}
      />
      <Button title="Buscar Feriados" onPress={fetchHolidays} />

      {loading && <Text style={styles.loading}>Carregando...</Text>}

      <FlatList
        data={holidays}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.holidayItem}>
            <Text style={styles.holidayDate}>{item.date}</Text>
            <Text style={styles.holidayName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  loading: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  holidayItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  holidayDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  holidayName: {
    fontSize: 14,
    color: '#555',
  },
});
