import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  FlatList,
  View,
  Animated,
  Image,
  ActivityIndicator,
  Easing,
} from 'react-native';
import axios from 'axios';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {ContactsContext} from './App';

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
  const sectionListRef = useRef(null);

  const scrollY = useRef(new Animated.Value(0)).current;

  const scrollBarOpacity = useRef(new Animated.Value(0)).current;

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
      listener: event => {
        const {y} = event.nativeEvent.contentOffset;
        Animated.timing(scrollBarOpacity, {
          toValue: y > 50 ? 1 : 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start();
       
      },
    },
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://randomuser.me/api/?results=100',
        );
        const sortedContacts = response.data.results.sort((a, b) =>
          a.name.first.localeCompare(b.name.first),
        );
        setContacts(sortedContacts);
      } catch (error) {
        console.log(error, 'from fetch');
      }
    };
    fetchData();
  }, [setContacts]);

  const handleContact = uuid => {
    navigation.navigate('ContactPage', {id: uuid});
  };

  const groupedContacts = contacts.reduce((acc, contact) => {
    const firstLetter = contact.name.first[0].toUpperCase();
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

  const handleScrollToLetter = letter => {
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
    inputRange: [0,60],
    outputRange: [height/4, 0],
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

 

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <Animated.View style={[styles.header, {height: headerHeight}]}>
        <Animated.View style={{opacity: iconOpacity}}>
          {/* <FontAwesome5 name="user" size={40} color="white" /> */}

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

      {/* <View style={styles.scrollBar} >
      
      {selected && (
        <View style={styles.selectedLetter} >
          <Text style={styles.selectedLetterText}>{selected}</Text>
        </View>
      )}
        {scrollBar.map((ele, i) => (
          <TouchableOpacity key={i} 
          onPress={() => handleScrollToLetter(ele)}
          onPressIn={()=>handleScrollToLetter(ele)}
          onFocus={()=>handleScrollToLetter(ele)}
          onLongPresS={()=>handleScrollToLetter(ele)}
          
          >
            <Text style={styles.scrollText}>{ele}</Text>
          </TouchableOpacity>
        ))}
       
      </View> */}

      <Animated.View style={[styles.scrollBar, {opacity: scrollBarOpacity}]}>
        {selected && (
          <View style={styles.selectedLetter}>
            <Text style={styles.selectedLetterText}>{selected}</Text>
          </View>
        )}
        {scrollBar.map((ele, i) => (
          <TouchableOpacity key={i} onPress={() => handleScrollToLetter(ele)}>
            <Text style={styles.scrollText}>{ele}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>

      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <Animated.SectionList
        ref={sectionListRef}
        sections={sections}
        keyExtractor={item => item.login.uuid}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListEmptyComponent={<ActivityIndicator size="large" color="#0000ff" />}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleContact(item.login.uuid)}>
            <View style={styles.listItem}>
              <View style={styles.icon}>
                <Image
                  style={styles.image}
                  source={{uri: item.picture.thumbnail}}
                />
              </View>
              <Text style={styles.contactText}>
                {`${item.name.first
                  .charAt(0)
                  .toUpperCase()}${item.name.first.slice(1)}`}
              </Text>
            </View>
            <View style={styles.contactBorder}></View>
          </TouchableOpacity>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Animated.View style={[styles.groupHeader]}>
            <Text>{title}</Text>
          </Animated.View>
        )}
      />
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
    padding:16,
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
    paddingLeft:16
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
  logo:{
    width:80,
    height:80,
    backgroundColor:'green',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:40  
  },
  logoText:{
    fontSize:24,
    fontWeight:"600"
  }
});

export default Home;
