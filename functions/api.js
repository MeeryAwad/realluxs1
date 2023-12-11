const express = require('express');
const app = express();
const multer = require('multer')
const db = require('../config/database')
var cors = require('cors');
const serverless=  require('serverless-http')

const { Event, Event1, Event2, Event3 } = require('../models/Event')


const { Services, } = require('./data')
const router = express.Router();

//----------------------------------------------------------------
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
const corsOption = {
    // origin: ['http://localhost:3000'],
    credentials: true,
    methods: ["get", "post", "put", "delete", "patch"],
}

app.use(cors(corsOption))

//------------------------------------------------------------------


// ---------------------------<GET>---------------------------
router.get('/', (req, res) => {
    res.send('');
});

router.get('/deliveryreqts', (req, res) => {

    Event.find({}, (err, events) => {

        res.status(200).json({ success: true, data: events });
        res.end();
    })
});
router.get('/doneOrderData', (req, res) => {

    Event2.find({}, (err, events2) => {

        res.status(200).json({ success: true, data: events2 });
        res.end();
    })

});
router.get('/Services', (req, res) => {

    res.status(200).json({ success: true, data: Services });
    res.end();

});

router.get('/Goods', (req, res) => {
    Event1.find({}, (err, events1) => {

        res.status(200).json({ success: true, data: events1 });
        res.end();
    })

});
router.get('/Cars', (req, res) => {

    Event3.find({}, (err, events3) => {

        res.status(200).json({ success: true, data: events3 });
        res.end();
    })

});

router.get('*', (req, res) => {
    res.send('404 Page Not Found')
});



// ---------------------------</GET>---------------------------

// ---------------------------<POST>---------------------------
// Operation on Image
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000,
    },
    filename: function (req, file, cb) {
        cb("", file.originalname);
    }, // Keep the original file name

}).single('photo');


router.post('/Goods', upload, (req, res) => {
    const { ProductType, text, price, date } = req.body;
    var photoBuffer = "";
    console.log(date)
    if (req.file) {
        photoBuffer = req.file.buffer;

    }
    var today = new Date();
    const date1 = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
   

    let newEvent = new Event1(
        {

            ProductType: ProductType,
            text: text,
            price: price,
            img: "",
            date: date1,
            photo: photoBuffer,



        }
    )
    newEvent.save((err) => {
        if (!err) {
            console.log("Order was ADD")
        }
        else {
            console.log(err)
        }
    })
})
router.post('/doneOrderData', (req, res) => {
    const { data } = req.body;
    let newEvent = new Event2(
        {

            FullName: data.FullName,
            Phone: data.Phone,
            date: data.data,
            From: data.From,
            To: data.To,
            Location: data.Location,
            Details: data.Details
        }
    )
    newEvent.save((err) => {
        if (!err) {
            console.log("Order was ADD")
        }
        else {
            console.log(err)
        }
    })
})
router.post('/Reqest', (req, res) => {
    const { data } = req.body;

    let newEvent = new Event(
        {

            FullName: data.FullName,
            Phone: data.Phone,
            date: data.date,
            From: data.From,
            To: data.To,
            LocationFrom: data.LocationFrom,
            LocationTo: data.LocationTo,
            Details: data.Details,
            show: false
        }
    )
    newEvent.save((err) => {
        if (!err) {
            console.log("Reqest was ADD")
        }
        else {
            console.log(err)
        }
    })

})
function receiveGpsData() {

    router.post('/Cars', async (req, res) => {
        const { carId, latitude, longitude } = req.body;

        var i = 0, count = Event3.length, matchFound = false;

        for (; i < count; i++) {
            if (Event3[i].carId == carId) {
                const query = Event3[i]._id
                let newFields = {
                    latitude: latitude,
                    longitude: longitude,

                }
                Event3.updateOne(query, newFields, (err) => {
                    if (!err)
                        console.log('success')
                    else {
                        console.log(err)
                    }

                })
                matchFound = true;
                break;
            }
        }
        if (matchFound == false) {
            let newEvent = new Event3(
                {

                    carId: carId,
                    latitude: latitude,
                    longitude: longitude,
                    carName: "",
                    from: "",
                    to: "",
                    driverName: "",
                    driverNumber: "",
                    CompanyName: ""
                }
            )

            newEvent.save((err) => {
                if (!err) {
                    console.log("Order was ADD")
                }
                else {
                    console.log(err)
                }
            })
        }
    })
}
const intervalMilliseconds = 150000;

// Function to receive GPS data at regular intervals
// function fetchDataPeriodically() {
// Initially receive data

// Set up the interval to receive data every 2 minutes
setInterval(() => {
    receiveGpsData();
}, intervalMilliseconds);
// }



// ---------------------------</POST>---------------------------

// ---------------------------<PUT>------------------------------
router.post('/updateGood', upload, (req, res) => {
    const { ProductType, text, price, date, _id } = req.body;
    var photoBuffer = "";

    if (req.file) {
        photoBuffer = req.file.buffer;

    }


    let newFields = {
        ProductType: ProductType,
        text: text,
        price: price,
        img: "",
        date: date,
        photo: photoBuffer,


    }
    let query = { _id: _id };
    Event1.updateOne(query, newFields, (err) => {
        if (!err)
            console.log('success')
        else {
            console.log(err)
        }

    })

})
router.post('/updateCars', (req, res) => {
    const { data } = req.body;


    let newFields = {
        carName: data.carName,
        from: data.from,
        to: data.to,
        driverName: data.driverName,
        driverNumber: data.driverNumber,
        CompanyName: data.CompanyName
    }
    let query = { _id: data._id };
    Event3.updateOne(query, newFields, (err) => {
        if (!err)
            console.log('success')
        else {
            console.log(err)
        }

    })
})
router.post('/updateReqest', (req, res) => {
    const { data } = req.body;


    let newFields = {
        FullName: data.FullName,
        Phone: data.Phone,
        date: data.data,
        From: data.From,
        To: data.To,
        LocationFrom: data.LocationFrom,
        LocationTo: data.LocationTo,
        Details: data.Details,
        show: true
    }
    let query = { _id: data._id };
    Event.updateOne(query, newFields, (err) => {
        if (!err)
            console.log('success')
        else {
            console.log(err)
        }

    })
})



// ---------------------------</PUT>------------------------------

// ---------------------------<Delete>------------------------------
router.post('/deleteGoods', (req, res) => {
    const { data } = req.body;
    let query = { _id: data._id };

    Event1.deleteOne(query, (err) => {
        if (!err)
            console.log('success')
        else {
            console.log(err)
        }

    })
})
router.post('/deleteDeliveryreqts', (req, res) => {
    const { data } = req.body;
    let query = { _id: data._id };

    Event.deleteOne(query, (err) => {
        if (!err)
            console.log('success')
        else {
            console.log(err)
        }
    })
})
router.post('/deleteDeliveryDone', (req, res) => {
    const { data } = req.body;
    let query = { _id: data._id };

    Event2.deleteOne(query, (err) => {
        if (!err)
            console.log('success')
        else {
            console.log(err)
        }

    })
})
router.post('/deleteCars', (req, res) => {
    const { data } = req.body;
    let query = { _id: data._id };

    Event3.deleteOne(query, (err) => {
        if (!err)
            console.log('success')
        else {
            console.log(err)
        }

    })

})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => { console.log('run') })
