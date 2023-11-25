export const SERVER = {
  PORT: 8080,
  BASE_URL: `http://localhost:8080`,
  ALLOWED_ORIGIN: ["*"],
  CORS: (origin, callback) => {
    if (SERVER.ALLOWED_ORIGIN.indexOf(origin) === -1 || !origin)
      callback(null, true);
    callback(new Error("Not allowed by CORS."));
  },
};
