import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function AddContacts({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email,setEmail]=useState('');

  const handleSave = () => {
    if (name && phone) {
      Alert.alert('Contact Saved', `Name: ${name}, Phone: ${phone}`);
      setName('');
      setPhone('');
     
      navigation.goBack();
    } else {
      Alert.alert('Validation Error', 'Please enter both name and phone number.');
    }
  };

  const handleCancel = () => {
    
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="numeric"
        value={phone}
        onChangeText={setPhone}
      />
       <TextInput
        style={styles.input}
        placeholder="Email"
        value={phone}
        onChangeText={setEmail}
      />
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={handleCancel} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor:'black'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
