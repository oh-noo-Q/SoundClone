const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const authRegisterRouter = require('./src/routes/routes.auth.register');
const authUpdateRouter = require('./src/routes/routes.auth.update');

const getUserSongsRouter = require('./src/routes/routes.song.getUserSongs');
const getDefaultRouter =require('./src/routes/routes.song.getDefault');
const searchRouter = require('./src/routes/routes.song.search');
const upfirebaseRouter = require('./src/routes/routes.song.upfirebase');
const uploadRouter = require('./src/routes/routes.song.upload');
const updateRouter = require('./src/routes/routes.song.update');
const deleteRouter = require('./src/routes/routes.song.delete');


const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.arbfb.mongodb.net/sound-clone?retryWrites=true&w=majority`, {
            autoIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('mongodb connected!');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};
connectDB();


const port = process.env.PORT;
const isProduction = process.env.NODE_ENV === 'production';
const app = express();

app.use(helmet());

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());


app.use('/api/auth/register', authRegisterRouter);
app.use('/api/auth/update', authUpdateRouter);

app.use('/api/song/getUserSongs', getUserSongsRouter);
app.use('/api/song/getDefault', getDefaultRouter);
app.use('/api/song/search', searchRouter);
app.use('/api/song/upfirebase', upfirebaseRouter);
app.use('/api/song/upload', uploadRouter);
app.use('/api/song/update', updateRouter);
app.use('/api/song/delete', deleteRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
