module.exports = {
  apps: [
    {
      name: "td",
      script: "./dist/main.js",
      env_prod: {
        NODE_ENV: "production",
        PORT: 5000,
        APP_NAME: "techdiary",
        GITHUB_APP_CLIENT_ID: "f4937c0eb1445d7b6cb4",
        GITHUB_APP_CLIENT_SECRET: "b72cb8ffc7497b0d01956f07ba9f934bc68c0c1b",
        DATABASE_URL:
          "mongodb+srv://techdiary:at5nuxWKIcDNDMLU@techdiary.xleej.mongodb.net/techdiary-prod?retryWrites=true&w=majority",
        JWT_SECRET: "7[5WedfgdfsgfdsUumRAgdfsgsd^.5I5Qgfdsgsdf",
        CLIENT_URL: "https://www.techdiary.dev",
      },
    },
  ],
};
