import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import React, { useContext } from 'react';
import { ContactsContext } from './App';
import { useRoute } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Realm} from 'realm'

const ContactPage = () => {
  const route = useRoute();
  const { contactId } = route.params;
  const { contacts } = useContext(ContactsContext);

  // Convert the string back to ObjectId
  const objectId = new Realm.BSON.ObjectId(contactId);
  
  // console.log(contactId,objectId,"from contact page  ----------- ")
  // console.log(contacts,"FROM THE CONTACT PAGE -----------")
 // Find the contact by ObjectId
 const contact = contacts.find(contact => contact._id.equals(objectId));
 

  if (!contact) {
    return (
      <View style={styles.container}>
        <Text style={styles.contactText}>Contact not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

    

    <View style={styles.card}></View>
      <Image 
        source={{ uri: contact.profilePicture.large }} 
        style={styles.image}
      />
      <Text style={styles.contactText}> {contact.firstName} {contact.lastName}</Text>
      <Text style={styles.contactText}>Phone: {contact.phone}</Text>
      <Text style={styles.contactText}>Email: {contact.email}</Text>

      <View style={styles.iconsContainer}>
      <TouchableOpacity style={styles.iconWrapper}>
      <FontAwesome5 name="phone" size={20} color="white" style={styles.icon}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconWrapper}>
      <FontAwesome5 name="envelope" size={20} color="white" />
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.iconWrapper}>
      <FontAwesome5 name="video" size={20} color="white" />
      </TouchableOpacity>
      </View>


      {/* <View style={styles.mobileContainer}>
        
        <View style={styles.mobileContainerLeft}>
        <Text>Mobile</Text>
        <Text>+91 7010872746</Text>
        </View>

          <View style={styles.mobileContainerRight}>
        <FontAwesome5 name="phone" size={15} color="green" style={styles.icon}/>
        <FontAwesome5 name="envelope" size={15} color="green" />
        <FontAwesome5 name="video" size={15} color="green" />
        </View>
      </View> */}

      <View style={styles.whatsAppContainer}>
        <Text style={styles.text}>WhatsApp</Text>

        <TouchableOpacity>
        <FontAwesome5 name="whatsapp-square" size={40} color="green" />
        </TouchableOpacity>
      </View>

      <View style={styles.telegram}>
        <Text style={styles.text}>Telegram</Text>

        <TouchableOpacity>
        <FontAwesome5 name="telegram" size={40} color="skyblue" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}>
      
        <Text style={styles.history}>History</Text>
      </TouchableOpacity>


      <View style={styles.bottomIconWrapper}>

      <TouchableOpacity style={styles.iconGroup}>
      <FontAwesome5 name="star" size={20} color="white" />
      <Text>Favourites</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconGroup}>
      <FontAwesome5 name="pen" size={20} color="white" />
      <Text>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconGroup}>
      <FontAwesome5 name="share-alt" size={20} color="white" />
      <Text>Share</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconGroup}>
      <FontAwesome5 name="ellipsis-v" size={20} color="white" />
      <Text>More</Text>
      </TouchableOpacity>

      </View>
  
    </View>
  );
}

export default ContactPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
    display:'flex',
    flexDirection:'column'
  },
  contactText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white', 
    fontWeight:'600',
    textAlign:"center",
   
  },
  image: {
    marginLeft:'auto',
    marginRight:"auto",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    
  },
  iconsContainer:{
    marginTop:"10%",
    display:'flex',
    flexDirection:'row',
    justifyContent:"space-around"
  },
  icon: {
    transform: [{ scaleX: -1 }],
  },
  iconWrapper:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    width:40,
    height:40,
    backgroundColor:"green"
  },
  mobileContainer:{

    display:'flex',
    flexDirection:"row",
    width:"100%",
    justifyContent:"space-between",
    alignItems:"center",
    marginTop:"10%"

  },
  mobileContainerLeft:{
    flex:0.5
  },
  mobileContainerRight:{
    flex:0.5,
    display:'flex',
    flexDirection:"row",
    width:"100%",
    justifyContent:"space-between",
    alignItems:'center'
  },
  whatsAppContainer:{
    width:"100%",
    display:'flex',
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginTop:"10%" ,
    paddingBottom:"5%",
    borderBottomColor:"grey",
    borderBottomWidth:1

  },

  telegram:{
    width:"100%",
    display:'flex',
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginTop:"5%" ,
    borderBottomColor:"grey",
  },
  text:{
    color:'white'
  },
   button:{
    marginTop:"5%",
    width:"70%",
    borderColor:"grey",
    margin:"auto",
    backgroundColor:"gray",
   borderRadius:25,
    padding:8    
   },
   history:{
    textAlign:"center",
    color:"white"

   },
   bottomIconWrapper:{
    display:'flex',
    flexDirection:"row",
    justifyContent:"space-between"
   },
   iconGroup:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
   }
  
 
});
