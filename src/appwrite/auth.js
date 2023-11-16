import config from "../config/config"
import { Client, Account, ID } from "appwrite"

export class AuthService {
    client = new Client()
    account
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if (userAccount) {
                //call another method
                //here we are trying to login the user directly after creating the account
                //to avoid the user to login again after creating the account
                return this.login({ email, password })
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            //Another way instead of throwing error
            console.log("Appwrite service :: logout :: error :: ", error)
        }
    }
}

const authService = new AuthService()

export default authService
