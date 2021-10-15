const express = require(`express`);
const app = express();
//router file

const bodyParser = require(`body-parser`);
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

//hook up router files
//app.use(``, )

app.use(express.static(`server/public`));

app.listen(PORT, () => {
    console.log(`app running on PORT`, PORT);
});