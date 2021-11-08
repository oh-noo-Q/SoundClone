// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//     apiKey: "AIzaSyCkbmb3qE6JmBC0DBmry3vu2MXbx6kCY1A",
//     authDomain: "sound-clone.firebaseapp.com",
//     projectId: "sound-clone",
//     storageBucket: "sound-clone.appspot.com",
//     messagingSenderId: "1040629774679",
//     appId: "1:1040629774679:web:97fe75334e58c5213f2612",
//     measurementId: "G-620PC1VKBR"
// };
  
// const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3333;
const isProduction = process.env.NODE_ENV === 'production';
const app = express();

app.use(helmet());

const accessLogStream = rfs('access.log', {
    interval: '1d',
    path: join(__dirname, 'log'),
});
app.use(
    isProduction ? morgan('combined', {stream: accessLogStream}) : morgan('dev')
);

app.use(cors());
app.use(express.json());

app.use('/', require('./src/routes/router.js').default);

app.get('*', (req, res) => {
    res.json({
        message: 'he he he',
    });
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
