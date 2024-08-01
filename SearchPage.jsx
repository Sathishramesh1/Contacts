
import { View, Text, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import React, { useContext, useState } from 'react';
import { ContactsContext } from './App';
import { useRoute } from '@react-navigation/native';




function ListEmptyComponent(){
return (
  <View style={styles.emptyPageContainer}>
    <Text style={styles.error}>No Result found</Text>
  </View>
)
}


export default function SearchPage() {

  const {query}=useContext(ContactsContext);

  const { contacts } = useContext(ContactsContext);

  const filteredContacts = contacts.filter(contact => {
    
    const name = `${contact.firstName || ''}${contact.lastName || ''} `.toLowerCase();
    const phoneNumber = contact.phone || '';
    return name.includes(query.toLowerCase()) || phoneNumber.includes(query);
  });

 


  return (
    <View style={styles.container}>
      <FlatList
     contentContainerStyle={filteredContacts.length === 0 ? styles.flatListEmpty : null}
        data={filteredContacts}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<ListEmptyComponent></ListEmptyComponent>}
        renderItem={({ item }) => (
          <View style={styles.listItem}>

          <Image 
          style={styles.image}
            source={{uri:item.profilePicture.thumbnail}}
          />
          <View style={styles.details}>
            <Text style={styles.contactText}>
              {`${item.firstName || ''} ${item.lastName || ''}`}
            </Text>
            {item.phone && (
              <Text style={styles.phoneText}>
                {item.phone}
              </Text>
              
            )}
            </View>
          </View>
        )}
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: 'white',
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    display:'flex',
    flexDirection:'row',
    alignItems:"center"
  },
  contactText: {
    color: 'white',
    fontSize: 18,
  },
  phoneText: {
    color: 'lightgray',
    fontSize: 16,
  },
  emptyPageContainer:{
    flex: 1,  
    justifyContent:'center',
    alignItems:"center",
    
  },
 error:{
  color:'white',
  fontSize:20

 },
 image:{
  width:40,
  height:40,
  borderRadius:50,
  justifyContent:'center',
  alignItems:"center",
  
 },
 details:{
  paddingLeft:16
 },

flatListEmpty: {
    flex: 1,
    justifyContent: 'center',
  },
 
});
