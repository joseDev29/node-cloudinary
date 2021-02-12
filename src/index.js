const app = require("./app");

app.listen(app.get("port"), () => {
  console.log(`Server listenning in http://localhost:${app.get("port")}`);
});
