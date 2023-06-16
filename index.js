const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const  multer = require('multer')
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')
const userRoutes = require('./routes/userRoutes')
const categoriesRoutes = require('./routes/categoriesRoutes')
dotenv.config()
const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
    // Aquí puedes realizar tus operaciones en la base de datos
  })
  .catch((error) => {
    console.error('Error al conectarse a MongoDB:', error);
});
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet())
app.use(morgan("common"))

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"images")
  },filename:(req,file,cb)=>{
    cb(null,req.body.name)
  },
})
const upload = multer({storage:storage});

//routing
app.use('/api/upload',upload.single("file"),(req,res,cb)=>{
  res.status(200).json('File has been uploaded')
})
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/post',postRoutes)
app.use('/api/categories',categoriesRoutes)

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`app listening on port ${port}!`))