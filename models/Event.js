const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    OrderListData1 = [
        {

            FullName: String,
            Phone: String,
            date: String,
            From: String,
            To: String,
            LocationFrom: String,
            LocationTo: String,
            Details: String,
            show: Boolean,
        }

    ],



)
const eventSchema1 = new mongoose.Schema(

    Goods = [
        {


            ProductType: String,
            text: String,
            price: String,
            img: String,
            date: String,
            photo: {
                type: Buffer,
                default:Buffer,
                
            }
         
        }

    ],


)
const eventSchema2 = new mongoose.Schema(

    doneOrder = [
        {

            FullName: String,
            Phone: String,
            date: String,
            From: String,
            To: String,
            Location: String,
            Details: String
        }

    ],


)

const eventSchema3 = new mongoose.Schema(

    Cars = [
        {
            carId: Number,
            latitude: Number,
            longitude: Number,
            carName: String,
            from: String,
            to: String,
            driverName: String,
            driverNumber: String,
            CompanyName: String
        }

    ],


)



let Event = mongoose.model('Event', eventSchema, 'events')
let Event1 = mongoose.model('Event1', eventSchema1, 'events1')
let Event2 = mongoose.model('Event2', eventSchema2, 'events2')
let Event3 = mongoose.model('Event3', eventSchema3, 'events3')


module.exports = { Event, Event1, Event2, Event3 }; 