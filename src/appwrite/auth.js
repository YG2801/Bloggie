import config from '../config/config';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call another method
        //here we are trying to login the user directly after creating the account
        //to avoid the user to login again after creating the account
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log('Appwrite service :: createAccount :: error :: ', error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log('Appwrite service :: login :: error :: ', error);
      if (error.code === 429) {
        throw Error('Server is busy, please try again later');
      }
      throw Error('Invalid email or password');
    }
  }

  async loginWithGoogle() {
    try {
      return this.account.createOAuth2Session(
        'google',
        `${window.location.origin}/`, //success redirect url
        `${window.location.origin}/login` //error redirect url
      );
    } catch (error) {
      console.log('Appwrite service :: loginWithGoogle :: error :: ', error);
      throw Error('Failed to login with Google');
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log('Appwrite service :: getCurrentUser :: error :: ', error);
      throw Error('Failed to get user data');
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log('Appwrite service :: logout :: error :: ', error);
      throw Error('Failed to logout');
    }
  }
}

const authService = new AuthService();

export default authService;
