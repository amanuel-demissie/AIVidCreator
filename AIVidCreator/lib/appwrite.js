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

        const newUser = await databases.createDocument( //create a new document in user collection(basically user profile info)
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

export const getCurrentUser = async() => {
    try{

        const currentAccount = await account.get() //Get the current session. This route will return the session details if the user is authenticated.
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId, 
            config.userCollectionId, 
            [Query.equal('accountId', currentAccount.$id)]) //Get the user document from the user collection.
        
        if(!currentUser) throw Error;

        return currentUser;

    } catch(error){
        console.log(error);
        return null;
    }
}

export const getAllPosts = async() => {
    try{
        const posts = await databases.listDocuments(
            config.databaseId, 
            config.videoCollectionId, 
            ) //Get all the videos from the video collection.

        return posts.documents;

    }catch(error){
        console.log("Error from getAllPosts function: ",error);
        throw new Error(error);

    }
}


export const getLatestPosts = async() => {
    try{
        const posts = await databases.listDocuments(
            config.databaseId, 
            config.videoCollectionId, 
            [Query.orderDesc('$createdAt', Query.limit(7))] //query to filter out posts(latest to be displayed)
            ) //Get all the videos from the video collection.

        return posts.documents;

    }catch(error){
        console.log("Error from getLatestPosts function: ",error);
        throw new Error(error);

    }
}

export const searchPosts = async(query) => {
    try{
        const posts = await databases.listDocuments(
            config.databaseId, 
            config.videoCollectionId, 
            [Query.search('title', query)] //search query by title
            ) //Get all the videos from the video collection.

        return posts.documents;

    }catch(error){
        console.log("Error from getLatestPosts function: ",error);
        throw new Error(error);

    }
}