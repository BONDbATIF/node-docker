const express = require("express");

const mongoose = require("mongoose");

const postRoutes = require("./routes/postRoutes");

const userRoutes = require("./routes/userRoutes");

const session = require("express-session");

const redis = require("redis");

let RedisStore = require("connect-redis")(session);

const cors =require("cors");

const {
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
  SESSION_SECRET,
  REDIS_URL,
  REDIS_PORT,
} = require("./config/config");

let redisClient = redis.createClient({
  legacyMode: true,
  url: "redis://redis:6379",
  //host: REDIS_URL,
  //port: REDIS_PORT,
});

//let redisClient = createClient({ legacyMode: true })
redisClient.connect().catch(console.error);

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to database"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

//https://expressjs.com/en/guide/behind-proxies.html
app.enable("trust proxy");

app.use(cors({}));

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 30000,
    },
  })
);

app.use(express.json());

const port = process.env.PORT || 3001;

app.get("/api/v1", (req, res) => {
  res.send("<h2>Hel..hshshdsdsfds.....</h2>");
  console.log("Yeah it is running");
});

app.use("/api/v1/posts", postRoutes);

app.use("/api/v1/users", userRoutes);

app.listen(port, () => console.log(`listening on port ${port}`));
