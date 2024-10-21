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

export const createUser = async(email, password, username) => {
    try{

        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error; //throw error if account creation fails

        const avatarUrl = avatars.getInitials(username); //if account created successfully, get avatar url(for profile picture)

        await signIn(email, password);

        const newUser = databases.createDocument( //create a new document in user collection(basically user profile info)
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser;

    } catch(error){
        console.log(error);
        throw new Error(error);
    }
}

export const signIn = async(email, password)  => {
    try{
        const session = await account.createEmailPasswordSession(email, password) //Allow the user to login into their account by providing a valid email and password combination. This route will create a new session for the user.
        return session;
    } catch(error) {
        throw new Error(error);
    }
}
