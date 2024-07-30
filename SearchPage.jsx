// import { View, Text, StyleSheet, FlatList } from 'react-native';
// import React, { useContext, useState } from 'react';
// import { TextInput } from 'react-native-gesture-handler';
// import { ContactsContext } from './App';
// import { useRoute } from '@react-navigation/native';

// export default function SearchPage() {
  

//   const route = useRoute();
//   const { query } = route.params || {};
//   const [search, setSearch] = useState(query);

//   const { contacts } = useContext(ContactsContext);

 
//   const filteredContacts = contacts.filter(contact => {
//     const name = contact.name.first.toLowerCase() + ' ' + contact.name.last.toLowerCase();
//     const phoneNumber = contact.phone || ''; 
//     return name.includes(search.toLowerCase()) || phoneNumber.includes(search);
//   });

//   const handleSearch = () => {
//     setSearch(prev=>prev);
//   };

//   return (
//     <View style={styles.container}>
      
//       <TextInput
//         style={styles.input}
//         placeholder="Search by name or phone number"
//         value={search}
//         onChangeText={handleSearch}
//       />

//       <FlatList
//         data={filteredContacts}
//         keyExtractor={(item) => item.login.uuid}
//         renderItem={({ item }) => (
//           <View style={styles.listItem}>
//             <Text style={styles.contactText}>
//               {`${item.name.first} ${item.name.last}`}
//             </Text>
//             {item.phone && (
//               <Text style={styles.phoneText}>
//                 {item.phone}
//               </Text>
//             )}
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: 'black',
//   },
//   header: {
//     fontSize: 24,
//     color: 'white',
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//     color: 'white',
//   },
//   listItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: 'gray',
//   },
//   contactText: {
//     color: 'white',
//     fontSize: 18,
//   },
//   phoneText: {
//     color: 'lightgray',
//     fontSize: 16,
//   },
// });

import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import { ContactsContext } from './App';
import { useRoute } from '@react-navigation/native';

export default function SearchPage() {

  const {query}=useContext(ContactsContext);

  const { contacts } = useContext(ContactsContext);

  const filteredContacts = contacts.filter(contact => {
    const name = `${contact.name.first || ''} ${contact.name.last || ''}`.toLowerCase();
    const phoneNumber = contact.phone || '';
    return name.includes(query.toLowerCase()) || phoneNumber.includes(query);
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.login.uuid}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.contactText}>
              {`${item.name.first || ''} ${item.name.last || ''}`}
            </Text>
            {item.phone && (
              <Text style={styles.phoneText}>
                {item.phone}
              </Text>
            )}
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
  },
  contactText: {
    color: 'white',
    fontSize: 18,
  },
  phoneText: {
    color: 'lightgray',
    fontSize: 16,
  },
});
