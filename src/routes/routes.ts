const path = require("path");
const express = require("express");
const router = express.Router();
let cookieParser = require("cookie-parser");

router.use(cookieParser());

// Middleware
let spotifyMiddleware = require("../middleware/spotify.middleware");

// Controllers
let mainController = require("../controllers/main.controller");
let authController = require("../controllers/authentication.controller");
let spotifyController = require("../controllers/spotify.controller");

/** Base Routes **/
router.get("/", mainController.getIndex);

/** Spotify Authentication **/
router.get("/login", authController.getSpotifyCreds);
router.get("/logout", authController.SpotifyLogout);
router.get("/spotify-login-callback", authController.SpotifyLoginCallback);
router.get("/spotify-token", authController.SpotifyLoginToken);

/** Spotify Communication **/
router.get("/spotify", spotifyMiddleware.AccessTokenExists, spotifyController.SpotifyTest);
router.get("/spotify/search", spotifyMiddleware.AccessTokenExists, spotifyController.SpotifySearch);
router.get(
    "/spotify/search-tracks",
    spotifyMiddleware.AccessTokenExists,
    spotifyController.SpotifySearchTracks
);
router.get(
    "/spotify/search-id",
    spotifyMiddleware.AccessTokenExists,
    spotifyController.SpotifySearchId
);

module.exports = router;
