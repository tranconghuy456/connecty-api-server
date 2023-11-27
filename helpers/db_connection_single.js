import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose";

export const useConnect = async () => {
    let mongod = await MongoMemoryServer.create();
    let getUri = mongod.getUri();

    return await mongoose.connect(getUri, {
        // option here
    })
}