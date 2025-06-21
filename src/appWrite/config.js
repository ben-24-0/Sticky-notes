import { Client, Account, Databases } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

const collections = [
    {
        name: "notes",
        id: import.meta.env.VITE_COLLECTION_NOTES_ID,
        dbId: import.meta.env.VITE_DATABASE_ID
    },
];
export { collections,client, account, databases };
