import { Movie } from "../models/movie.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addNewMovie = asyncHandler(async (req, res) => {
  const { title, description, rating, releaseDate } = req.body;

  if (!title || !description || !rating || !releaseDate) {
    return res
      .status(400)
      .json(new ApiResponse(400, "All fields are required", null));
  }
  const adminUserId = req.user._id;
  // Generate a random duration between 1 hour (60 minutes) and 3 hours (180 minutes)
  const duration = Math.floor(Math.random() * (180 - 60 + 1)) + 60;

  const posterPath = `/uploads/posters/${req.file.filename}`;

  const newMovie = new Movie({
    title,
    description,
    poster: posterPath,
    rating,
    duration,
    createdBy: adminUserId,
    releaseDate,
  });
  const savedMovie = await newMovie.save();
  if (!savedMovie) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "Something went wrong while adding the movie"
        )
      );
  }
  return res
    .status(201)
    .json(new ApiResponse(201, "Movie added successfully", savedMovie));
});

const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find();
  if (!movies) {
    return res.status(404).json(new ApiResponse(404, null, "No movies found"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Movies retrieved successfully", movies));
});

const getSortedMovies = asyncHandler(async (req, res) => {
  const { sortBy } = req.query;

  const validFields = ["name", "rating", "releaseDate", "duration"];

  if (!validFields.includes(sortBy)) {
    return res.status(400).json({
      success: false,
      message: `Invalid sort field. Valid options are: ${validFields.join(
        ", "
      )}`,
    });
  }

  const movies = await Movie.find().sort({ [sortBy]: 1 });
  if (!movies) {
    return res.status(404).json({
      success: false,
      message: "No movies found",
    });
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Movies retrieved successfully", movies));
});

const searchMovies = asyncHandler(async (req, res) => {
  const { name } = req.query;
  console.log(name);
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Search query is required.",
    });
  }

  // Perform a case-insensitive search using a regular expression
  const movies = await Movie.find({
    $or: [
      { title: { $regex: name, $options: "i" } },
      { description: { $regex: name, $options: "i" } },
    ],
  });

  if (movies.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No movies found matching your search criteria.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Movies retrieved successfully",
    data: movies,
  });
});

const editMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Movie ID is required"));
  }
  const posterPath = `/uploads/posters/${req.file.filename}`;
  const { title, description, poster, rating, releaseDate } = req.body;
  if (!title || !description || !rating || !releaseDate) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields are required"));
  }
  const updatedMovie = await Movie.findByIdAndUpdate(id, 
  {
    title,
    description,
    poster: posterPath,
    rating,
    releaseDate,
  }
    , {
    new: true,
  });
  if (!updatedMovie) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "Something went wrong while updating the movie"
        )
      );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Movie updated successfully", updatedMovie));
});

const deleteMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const deletedMovie = await Movie.findByIdAndDelete(id);
  if (!deletedMovie) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "Something went wrong while deleting the movie"
        )
      );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Movie deleted successfully", deletedMovie));
});

export {
  addNewMovie,
  getMovies,
  getSortedMovies,
  searchMovies,
  editMovie,
  deleteMovie,
};
