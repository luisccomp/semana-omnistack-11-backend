const dotenv = require('dotenv');

const app = require('./app');


dotenv.config();

const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`Process running at port ${port}`);
});
