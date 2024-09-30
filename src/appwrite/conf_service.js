import config from '../config/config';
import { Client, ID, Databases, Storage } from 'appwrite';

export class Service {
  client = new Client();
  databases;
  storage; // or bucket

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createUser({ $id, name, email }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteUsersCollectionID,
        $id,
        {
          name,
          email,
        }
      );
    } catch (error) {
      console.log('Appwrite service :: createUser :: error :: ', error);
    }
  }

  async getUser($id) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteUsersCollectionID,
        $id
      );
    } catch (error) {
      console.log('Appwrite service :: getUser :: error :: ', error);
    }
  }

  async updateUser($id, updatedData) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteUsersCollectionID,
        $id,
        updatedData
      );
    } catch (error) {
      console.log('Appwrite service :: updateUser :: error :: ', error);
      throw Error('Failed to update user');
    }
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionID,
        slug,
        {
          title,
          body: content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log('Appwrite service :: createPost :: error :: ', error);
      throw Error('Failed to create post');
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionID,
        slug,
        {
          title,
          body: content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log('Appwrite service :: updatePost :: error :: ', error);
      throw Error('Failed to update post');
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log('Appwrite service :: deletePost :: error :: ', error);
      throw Error('Failed to delete post');
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionID,
        slug
      );
    } catch (error) {
      console.log('Appwrite service :: getPost :: error :: ', error);
      throw Error('Failed to get post');
    }
  }

  async getPosts(queries) {
    try {
      const res = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionID,
        queries
      );
      res.documents = await Promise.all(
        res.documents.map(async (doc) => {
          const user = await this.getUser(doc.userId);
          return { ...doc, user };
        })
      );
      return res;
    } catch (error) {
      console.log('Appwrite service :: getPosts :: error :: ', error);
      throw Error('Failed to get posts');
    }
  }

  //file services

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log('Appwrite service :: uploadFile :: error :: ', error);
      throw Error('Failed to upload file');
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(config.appwriteBucketID, fileId);
      return true;
    } catch (error) {
      console.log('Appwrite service :: deleteFile :: error :: ', error);
      throw Error('Failed to delete file');
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(
      config.appwriteBucketID,
      fileId,
      0,
      0,
      'center',
      '30'
    );
  }
}

const service = new Service();

export default service;
