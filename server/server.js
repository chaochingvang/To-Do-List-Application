const express = require(`express`);
const app = express();
//router file
const listRouter = require(`./routes/list.router.js`);

const bodyParser = require(`body-parser`);
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

//hook up router files
app.use(`/list`, listRouter);

app.use(express.static(`server/public`));

app.listen(PORT, () => {
    console.log(`app running on PORT`, PORT);
});