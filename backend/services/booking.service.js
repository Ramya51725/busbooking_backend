import { MONGO_DATABASE,client } from "../index.js";
import { ObjectId } from "mongodb";


const newBooking = async(payload) => {
    payload.bookingId = "BT-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    payload.status = payload.status || "Confirmed";

    const booking = await client 
    .db(MONGO_DATABASE)
    .collection("bookings")
    .insertOne(payload)

    if (booking.insertedId){
        return{
            data : payload,
            message : "bus booking successfully"
        }
    }
}



const getBookingsByUserId = async (id) => {
    const data = await client
    .db(MONGO_DATABASE)
    .collection("bookings")
    .find({ userId : id })  
    .toArray();   

    return data

}

const cancelBookingService = async (id) => {
  const result = await client
    .db(MONGO_DATABASE)
    .collection("bookings")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "Cancelled" } }
    );

  return result;
};



export {newBooking , getBookingsByUserId , cancelBookingService } 