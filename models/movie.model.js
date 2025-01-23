import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    duration: {
      type: Number, // Duration in minutes
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    }, 
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  // Refers to the User model
      required: true,  // Ensures that each movie has an admin (user) who created it
    },
  },
  { timestamps: true }
);

export const Movie = mongoose.model("Movie", movieSchema);
