import { Client } from "appwrite";
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string) // Appwrite server endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string); // Appwrite project ID

export default client;
