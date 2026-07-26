const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://localhost:27017/wanderlust";


main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log("err");
});


async function main() {
    await mongoose.connect(MONGO_URL);
}


const initDB = async () => {
    await Listing.deleteMany({});

   initData.data = initData.data.map((obj) => ({ 
    ...obj, 
    owner: '6a59d6e0187ff097950ce5d6'}));
    // await Listing.insertMany(initData.data);
    const result = await Listing.insertMany(initData.data);
// console.log(result[0]);

console.log("data was initialized");
}
initDB();