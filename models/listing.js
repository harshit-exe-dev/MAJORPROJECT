const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  
  
  price: Number,

  location: String,
  country: String,

//   image: {
//     url: {
//     type: String,
//     default: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//     set: (v) =>
//       v === ""
//      ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
//      : v,
//   },
//   filename: {
//     type: String,
//     default: "default-image"
//   }
// },

image: {
  url: String,
  filename: String,
},


  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",

    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});


listingSchema.post("findOneAndDelete", async (listing) => {

if(listing) {
  await Review.deleteMany({_id : {$in: listing.reviews}});
}

});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;