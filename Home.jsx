import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Animated,
  Image,
  ActivityIndicator,
  Easing,
  Button,
} from 'react-native';
import axios from 'axios';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {ContactsContext} from './App';
import { FlatList } from 'react-native-gesture-handler';
import contact from './contact.json'

import realm from './dataBase/Contacts';
import {Realm} from 'realm'


const {height} = Dimensions.get('window');

function Home() {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const {contacts, setContacts} = useContext(ContactsContext);

  const [scrollBar, setScrollBar] = useState([
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    
  ]);

  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);

  const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
const [hasMore, setHasMore] = useState(true);

  // for the contact list sections
  const sectionListRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const scrollBarOpacity = useRef(new Animated.Value(0)).current;


  //for the scroll bar section
  const scrollViewRef = useRef(null);
  const scrollViewY=useRef(new Animated.Value(0)).current;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handlePress = () => {
    navigation.navigate('AddContact');
  };

  const handleSearch = () => {
    navigation.navigate('Search');
  };

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],

    {
      useNativeDriver: false,
      // listener: event => {
      //   const {y} = event.nativeEvent.contentOffset;
      //   if (y > 50) {
      //     setVisible(true);
      //   } else {
      //     setVisible(false);
      //   }
      //   Animated.timing(scrollBarOpacity, {
      //     toValue: y > 50 ? 1 : 0,
      //     duration: 300,
      //     easing: Easing.ease,
      //     useNativeDriver: true,
      //   }).start();
      // },
    },
  );


  const handleDeleteAllContacts = () => {
    try {
      realm.write(() => {
        const allContacts = realm.objects('Contact');
        realm.delete(allContacts);
      });
      setContacts([]);
      console.log('All contacts successfully deleted from Realm');
    } catch (error) {
      console.error('Error deleting all contacts from Realm:', error);
    }
  };

  // const fetchData = async (page) => {
  //   if (loading) return; 
  //   setLoading(true);
  
  //   try {
  //     // const response = await axios.get(`https://randomuser.me/api/?results=20&page=${page}`);
  //     // const newContacts = response.data.results;
  //     // const results=await axios.post()
      
  //     // if (newContacts.length === 0) {
  //     //   setHasMore(false); 
  //     // } else {
  //     //   const sortedContacts = newContacts.sort((a, b) =>
  //     //     a.name.first.localeCompare(b.name.first),
  //     //   );
  //     //   setContacts(prevContacts => [...prevContacts, ...sortedContacts]);
  // const sortedContacts=contact.results.sort((a, b) =>
  //       a.name.first.localeCompare(b.name.first),
  //     );

  //       realm.write(() => {
  //         sortedContacts.forEach(contact => {
  //           realm.create('Contact', {
  //             _id: new Realm.BSON.ObjectId(),
  //     firstName: contact.name.first,
  //     lastName: contact.name.last,
  //     phoneNumber: contact.phone,
  //     email: contact.email,
  //     address: contact.location.street.name,
  //     profilePicture: {
  //       large: contact.picture.large,
  //       medium: contact.picture.medium,
  //       thumbnail: contact.picture.thumbnail,
  //     },
  //     birthday: new Date(contact.dob.date),
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //           });
  //         });
  //       });
  //     // }
  //   } catch (error) {
  //     console.log(error, 'from fetch');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const addContact = async () => {
    try {
      
      const sortedContacts = contact.results.sort((a, b) =>
        a.name.first.localeCompare(b.name.first),
      );
  
      
      realm.write(() => {
        sortedContacts.forEach(contact => {
          realm.create('Contact', {
            _id: new Realm.BSON.ObjectId(),
            firstName: contact.name.first,
            lastName: contact.name.last,
            phoneNumber: contact.phone,
            email: contact.email,
            address: contact.location.street.name,
            profilePicture: {
              large: contact.picture.large,
              medium: contact.picture.medium,
              thumbnail: contact.picture.thumbnail,
            },
            birthday: new Date(contact.dob.date),
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
      });
  
      
      console.log('Contacts successfully added to Realm');
    } catch (error) {
      
      console.error('Error adding contacts to Realm:', error);
    }
  };


  // const handleNavigationScroll = Animated.event(
  //   [{ nativeEvent: { contentOffset: { y: scrollViewY } } }],
  //   {
  //     useNativeDriver: false,
  //     listener: event => {
  //       const { y } = event.nativeEvent.contentOffset;
  //       console.log("Scroll position:", y);

  //       // const itemHeight = 28;
  //       // const index = Math.floor(y / itemHeight);
  //       // const focusedLetter = scrollBar[Math.max(0, Math.min(scrollBar.length - 1, index))];

  //       // setSelected(focusedLetter);
  //       // console.log('Focused Letter:', focusedLetter);
  //     },
  //   }
  // );

  const handleNavigationScroll=(event)=>{
  console.log('-------------')

  }

    

  //fetching the data from realm database
 
   // Memoized callback for fetchContactsFromRealm

   const PAGE_SIZE = 20;
  const fetchContactsFromRealm = useCallback(() => {
    try {
      const allRealmContacts = realm.objects('Contact').sorted('firstName');

      console.log(allRealmContacts.length,"from the length of fetched data");
      const startIndex = (page - 1) * PAGE_SIZE;
      const paginatedContacts = allRealmContacts.slice(startIndex, startIndex + PAGE_SIZE);
      const hasMore = paginatedContacts.length === PAGE_SIZE;
      setHasMore(hasMore);
      setContacts(prevContacts => [...prevContacts, ...paginatedContacts]);
    } catch (error) {
      console.error('Error fetching contacts from Realm:', error);
    }
  }, [page, setContacts]);

  useEffect(() => {
   
    // fetchData(page);
    fetchContactsFromRealm(page);
  }, [page]);

  // useEffect(() => {
  //   const realmContacts = realm.objects('Contact');
  //   setContacts([...realmContacts]);
  // }, [setContacts]);


  const handleContact = (uuid) => {

    const contactIdString = uuid.toHexString();
    navigation.navigate('ContactPage', {contactId: contactIdString});
  };

  const groupedContacts = contacts.reduce((acc, contact) => {
    const firstLetter = contact.firstName[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {});

  const sections = Object.keys(groupedContacts)
    .sort()
    .map(letter => ({
      title: letter,
      data: groupedContacts[letter],
    }));

   const scrollSection=scrollBar.map(letter => ({
    title: letter,
    data:[letter],
  }));

  const handleScrollToLetter = (letter) => {
   
    setSelected(letter);
    const sectionIndex = sections.findIndex(
      section => section.title === letter.toUpperCase(),
    );
    if (sectionIndex !== -1 && sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        animated: true,
      });
    }
    setSelected(null);
  };

  
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [height / 4, 0],
    extrapolate: 'clamp',
  });

  const headerScale = scrollY.interpolate({
    inputRange: [0, 30, 40, 50, 60],
    outputRange: [1, 0.4, 0.3, 0.2, 0.1],
    extrapolate: 'clamp',
  });

  const iconOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const textOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const handlePointerEvents = opacity => (opacity === 0 ? 'none' : 'auto');



  //memoizing the list items Component from  the section list 
  const ListItem = React.memo(({ item, onPress }) => (
    <TouchableOpacity onPress={() => onPress(item._id)}>
      <View style={styles.listItem}>
        <View style={styles.icon}>
          <Image
            style={styles.image}
            source={{ uri: item.profilePicture.thumbnail }}
          />
        </View>
        <Text style={styles.contactText}>
          {`${item.firstName.charAt(0).toUpperCase()}${item.firstName.slice(1)}`}
        </Text>
      </View>
      <View style={styles.contactBorder}></View>
    </TouchableOpacity>
  ));
  

  //memoizing the list section header in the section List
  const SectionHeader = React.memo(({ title }) => (
    <Animated.View style={[styles.groupHeader]}>
      <Text>{title}</Text>
    </Animated.View>
  ));



  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <Animated.View
        style={[
          styles.header,
          {height: headerHeight, transform: [{scale: headerScale}]},
        ]}>
        <Animated.View style={{opacity: iconOpacity}}>
         
          <View style={styles.logo}>
            <Text style={styles.logoText}>S</Text>
          </View>
        </Animated.View>
        <Animated.Text style={[styles.headerText, {opacity: textOpacity}]}>
          sathish ramesh
        </Animated.Text>
      </Animated.View>

      <View style={styles.navbar}>
        <View style={styles.navLeft}>
          <TouchableOpacity style={styles.contactHeader}>
            <FontAwesome5 name="bars" size={20} color="white" />

            <Text style={styles.contactHeaderText}>Contacts</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navRight}>
          <TouchableOpacity onPress={handlePress}>
            <FontAwesome5 name="plus" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSearch}>
            <FontAwesome5 name="search" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5 name="ellipsis-v" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* <Animated.View
        style={[
          styles.scrollBar,
          {
            opacity: scrollBarOpacity,
          },
        ]}
        onScroll={handleNavigationScroll}
        ref={scrollViewRef}
        
        // pointerEvents={handlePointerEvents(scrollBarOpacity)}
        >
        {selected && (
          <View style={styles.selectedLetter}>
            <Text style={styles.selectedLetterText}>{selected}</Text>
          </View>
        )}
        {visible &&
          scrollBar.map((ele, i) => (
            <TouchableOpacity key={i} onPress={() => handleScrollToLetter(ele)}>
              <Text style={styles.scrollText}>{ele}</Text>
            </TouchableOpacity>
          ))
          
          
          
          }
      </Animated.View> */}


      {/* <Animated.FlatList
        style={[
          styles.scrollBar,
          {
            opacity: scrollBarOpacity,
          },
        ]}
        data={scrollBar}
        renderItem={({item }) => (
          
          <TouchableOpacity onPress={() => handleScrollToLetter(item)}>
            <Text style={styles.scrollText}>{item}</Text>
          
          </TouchableOpacity>
          
        )}
        keyExtractor={(item,i) =>i+item}
        onScroll={
          handleNavigationScroll
         
        }
        ref={scrollViewRef}
        scrollEventThrottle={16} 
      />

      {selected && (
        <View style={styles.selectedLetter}>
          <Text style={styles.selectedLetterText}>{selected}</Text>
        </View>
      )} */}

      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <Animated.SectionList
        ref={sectionListRef}
        sections={sections}
        keyExtractor={(item,i) => item._id.toString()+i}
        onScroll={
         handleScroll
      }
      onEndReached={() => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
      }
      }
      onEndReachedThreshold={0.3} 
        scrollEventThrottle={16}
        ListEmptyComponent={<ActivityIndicator size="large" color="#FF0000" />}
        renderItem={({ item }) => (
    <ListItem item={item} onPress={handleContact} />
  )}
  renderSectionHeader={({ section: { title } }) => (
    <SectionHeader title={title} />
  )}
        renderSectionFooter={({ section }) => (
  section.title === sections[sections.length - 1].title && hasMore && (
    <View style={styles.sectionFooter}>
      <ActivityIndicator size="large" color="#FF0000" />
    </View>
  )
)}
      />

   

     {/* <Button title='post'
     onPress={addContact}
     ></Button>

     <Button title='delete' onPress={handleDeleteAllContacts}></Button> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  contactHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  contactHeaderText: {
    color: 'white',
    fontSize: 20,
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  headerText: {
    fontSize: 32,
    color: 'white',
  },
  navbar: {
    flexDirection: 'row',
    width: '95%',
    padding: 16,
    margin: 'auto',
    marginTop: 10,
  },
  navLeft: {
    marginRight: 'auto',
  },
  navRight: {
    marginLeft: 'auto',
    flexDirection: 'row',
    width: '25%',
    justifyContent: 'space-between',
  },

  scrollBar: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    right: 5,
    zIndex: 999,
    backgroundColor: 'grey',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  scrollText: {
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 2,
    textTransform: 'capitalize',
  },
  selectedLetter: {
    position: 'absolute',
    fontSize: 40,
    zIndex: 1000,
    right: 40,
    width: 40,
    height: 40,
    top: 100,
    backgroundColor: 'blue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  selectedLetterText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  groupHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
    color: 'white',
    paddingHorizontal: 32,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 20,
    color: 'white',
    padding: 10,
    paddingLeft: 16,
    // borderBottomColor:"grey",
    // borderBottomWidth:1,
  },
  icon: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    padding: 5,
  },

  image: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 40,
    height: 40,
    borderRadius: 20,
    // marginBottom: 20,
  },

  iconText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactText: {
    paddingLeft: 20,
    fontSize: 18,
    color: 'white',
  },
  contactBorder: {
    width: '80%',
    marginLeft: '20%',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  scrollBarContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    right: 5,
    zIndex: 9999,
    backgroundColor: 'lightblue',
    height: 'auto',
  },
  logo: {
    width: 80,
    height: 80,
    backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '600',
  },
  paginationGroup:{
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    gap:16,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor:'grey',
    zIndex: 9999,
  },
  sectionFooter:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
 
});

export default Home;
