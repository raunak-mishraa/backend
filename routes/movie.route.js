import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { isAdminUser } from "../middlewares/auth.middleware.js";
import {
  addNewMovie,
  getMovies,
  getSortedMovies,
  searchMovies,
  editMovie,
  deleteMovie,
} from "../controllers/movie.controller.js";
const router = Router();
router
  .route("/")
  .post(isAdminUser ,upload.single("poster"), addNewMovie)
  .get(getMovies);
router.route("/sorted").get(getSortedMovies);
router.route("/search").get(searchMovies);
router
  .route("/:id")
  .put(isAdminUser,upload.single("poster"), editMovie)
  .delete(isAdminUser, deleteMovie);

export default router;
