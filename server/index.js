const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const authRegisterRouter = require('./src/routes/routes.auth.register');
const authLoginRouter = require('./src/routes/routes.auth.login');
const uploadRouter = require('./src/routes/routes.upload');

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.arbfb.mongodb.net/sound-clone?retryWrites=true&w=majority`, {
            autoIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
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

// morgan
// const accessLogStream = rfs.createStream('access.log', {
//     interval: '1d',
//     path: join(__dirname, 'log'),
// });

// app.use(
//     isProduction ? morgan('combined', {stream: accessLogStream}) : morgan('dev')
// );

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/auth/register', authRegisterRouter);
app.use('/api/auth/login', authLoginRouter);
app.use('/api/upload', uploadRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
