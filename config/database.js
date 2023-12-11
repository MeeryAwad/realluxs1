const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/events')
// .then(() => console.log('Connected Successfully'))

mongoose.connect('mongodb+srv://Admin:12345@realluxs.6wxknxv.mongodb.net/db?retryWrites=true&w=majority')
.then(() => console.log('Connected Successfully'))

.catch((err) => { console.error(err); });