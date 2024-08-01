import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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

       <View style={styles.inputField}>
      <FontAwesome5 name="user" size={16} color="green" />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      </View>

      <View style={styles.inputField}>
      <FontAwesome5 name="phone" size={15} color="green" style={styles.icon}/>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="numeric"
        value={phone}
        onChangeText={setPhone}
      />

</View>

<View style={styles.inputField}>
<FontAwesome5 name="envelope" size={15} color="green" />
  <TextInput
        style={styles.input}
        placeholder="Email"
        value={phone}
        onChangeText={setEmail}
      />
      </View>
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
    color:"white"
  },
  input: {
    height: 40,
    fontSize:16,
    
   
    // paddingHorizontal: 10,
    width:"90%"
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputField:{
    flexDirection:"row",
    justifyContent:'center',
    alignItems:"center",
    borderColor: 'gray',
    borderWidth: 1,
    gap:10,
    marginBottom: 15,
    
  },
  icon: {
    transform: [{ scaleX: -1 }],
  },
});
