
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const authLoginRouter = require('./src/routes/routes.auth.login');
const authTokenRouter = require('./src/routes/routes.auth.token');
const authLogoutRouter = require('./src/routes/routes.auth.logout');
const authRouter = require('./src/routes/routes.auth');

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


const port = process.env.PORT_AUTH || 4444;
const isProduction = process.env.NODE_ENV === 'production';
const app = express();

app.use(helmet());

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());


app.use('/api/auth/login', authLoginRouter);
app.use('/api/auth/token', authTokenRouter);
app.use('/api/auth/logout', authLogoutRouter);
app.use('/api/auth', authRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
