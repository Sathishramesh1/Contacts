import Realm from 'realm';


const ProfilePictureSchema = {
  name: 'ProfilePicture',
  properties: {
    large: 'string?',
    medium: 'string?',
    thumbnail: 'string?',
  },
};

const ContactSchema = {
  name: 'Contact',
  properties: {
   _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
    firstName: 'string',
    lastName: 'string',
    phoneNumber: 'string?',
    email: 'string?',
    address: 'string?',
    profilePicture: 'ProfilePicture?',
    birthday: 'date?',
    createdAt: { type: 'date', default: new Date() },
    updatedAt: { type: 'date', default: new Date() },
  },
};


const migration = (oldRealm, newRealm) => {
  
  if (oldRealm.schemaVersion < 1) {
    const oldObjects = oldRealm.objects('Contact');
    const newObjects = newRealm.objects('Contact');
    for (let i = 0; i < oldObjects.length; i++) {
      newObjects[i]._id = new Realm.BSON.ObjectId();
    }
  }
};

const realm = new Realm({
  schema: [ProfilePictureSchema, ContactSchema],
  schemaVersion: 1, 
  migration,
});

export default realm;