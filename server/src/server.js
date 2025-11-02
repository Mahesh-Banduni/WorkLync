const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const crypto = require("crypto");
const { errorHandler } = require("./middlewares/error.handler.js");
const authRoutes = require("./routes/auth.route.js");
const userRoutes = require("./routes/user.route.js");
const employeeRoutes = require("./routes/employee.route.js");
const candidateRoutes = require("./routes/candidate.route.js");
const notificationRoutes = require("./routes/notification.route.js");
const bodyParser = require("body-parser");

require("dotenv").config();

server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// Middleware to generate a CSP nonce
server.use((req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(32).toString("base64");
  next();
});

// Configure Helmet for enhanced security
server.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`],
        styleSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`],
        imgSrc: ["'self'", "data:"],
        objectSrc: ["'none'"],
        fontSrc: ["'self'"],
        frameSrc: ["'self'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: { policy: "require-corp" },
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "same-origin" },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    strictTransportSecurity: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    xContentTypeOptions: true,
    dnsPrefetchControl: { allow: false },
    frameguard: { action: "deny" },
    originAgentCluster: true,
  })
);

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(bodyParser.json())

// Route setup
server.use("/api/user", userRoutes);
server.use("/api/auth", authRoutes);
server.use("/api/employees", employeeRoutes);
server.use("/api/candidates", candidateRoutes);
server.use("/api/notification", notificationRoutes);

// Error handling middleware
server.use(errorHandler);

// // Global error handling for uncaught exceptions and unhandled rejections
// process.on("uncaughtException", (err) => {
//   logger.error(`Uncaught Exception: ${err.message}`);
//   process.exit(1);
// });

// process.on("unhandledRejection", (reason, promise) => {
//   logger.error(`Unhandled Rejection: ${reason}`);
//   process.exit(1);
// });

// // Graceful shutdown
// const shutdown = () => {
//   logger.info(`Worker ${process.pid} shutting down gracefully.`);
//   process.exit(0);
// };

// process.on("SIGINT", shutdown);
// process.on("SIGTERM", shutdown);

// Start the server
const port = process.env.SOURCE_PORT || 3000;
server.listen(port, () => {
  console.log(`Server is listening at ${process.env.HOSTNAME}`);
});