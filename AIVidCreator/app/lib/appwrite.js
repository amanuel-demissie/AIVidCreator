import { Client, Account, ID, Models, Avatars, Databases, Query } from 'react-native-appwrite';

export const config =  { //all the information about my database from appwrite
    endPoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aora',
    projectId: '66dca57e002745ec4b04',
    databaseId: '66dca842002d22639114',
    userCollectionId: '66dca86c003486ccbb98',
    videoCollectionId: '66dca91e0016980418b3',
    storageId: '66df2717003af23b0185',

}

const client = new Client()
  .setEndpoint(config.endPoint)
  .setProject(config.projectId)   // Your Project ID
  .setPlatform(config.platform)   // Your package name / bundle identifier

const account = new Account(client); //const of account
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = () => {
    account.create(ID.unique(), 'johndoe@example.com', 'john12345', 'John Doe' )
    .then(function (response){
        console.log(response);
    }, function (error){
        console.log(error);
    });
}