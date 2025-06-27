const app = require('./index');
const { connection } = require('./util/databse');

// console.log(process.env)
const PORT = process.env.PORT || 2000;

connection();

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT PORT ${PORT}`);
});