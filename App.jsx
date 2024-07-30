
import { View, Text, AppState, TextInput, StyleSheet } from 'react-native'
import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
//  import App from './App'
import Home from './Home'
import AddContacts from './Components/AddContacts';


import { createStackNavigator } from '@react-navigation/stack';
import SearchPage from './SearchPage';
import ContactPage from './ContactPage';


const Stack = createStackNavigator();


export const ContactsContext = React.createContext();

const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = React.useState([
    
    
  ]);

  const [query,setQuery]=React.useState('');

  return (
    <ContactsContext.Provider value={{ contacts, setContacts,query,setQuery }}>
      {children}
    </ContactsContext.Provider>
  );
};



export default function App() {


  
  return (
    <ContactsProvider>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home"
    screenOptions={{
    headerShown: false,
    transitionSpec: {
              open: { animation: 'spring', config: { stiffness: 1000, damping: 500 } },
              close: { animation: 'timing', config: { duration: 300 } },
            },
            cardStyleInterpolator: ({ current, next, layouts }) => {
              return {
                cardStyle: {
                  opacity: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolate: 'clamp',
                  }),
                },
              };
            },
            headerStyleInterpolator: ({ current, next, layouts }) => {
              return {
                headerStyle: {
                  opacity: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolate: 'clamp',
                  }),
                },
              };
            },
  }}
    >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Contacts'}}
        />
        <Stack.Screen name="AddContact"
         component={AddContacts} />
         <Stack.Screen name="Search"
         component={SearchPage}
         options={({ route, navigation }) => {
          
          const { query, setQuery } = React.useContext(ContactsContext);

              return {
                headerShown: true,
                headerTitle: () => (
                  <View style={styles.headerContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Search by name or phone number"
                      value={query}
                      onChangeText={text => setQuery(text)}
                      onSubmitEditing={() => {
                        navigation.navigate('Search', { query });
                      }}
                    />
                  </View>
                ),
                headerStyle: styles.headerStyle,
                headerTintColor: '#fff',
                headerTitleStyle: styles.headerTitleStyle,
              };
            }}
          />
           <Stack.Screen name="ContactPage"
         component={ContactPage}
          />
      </Stack.Navigator>
    
  </NavigationContainer>
  </ContactsProvider>
  )
}


const styles=StyleSheet.create({
  headerContainer: {
    display:"flex",
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height:"auto",
    backgroundColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchInput: {
      
      flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  headerStyle: {
    backgroundColor: '#333',
  },
  headerTitleStyle: {
    color: '#fff',
  },


})