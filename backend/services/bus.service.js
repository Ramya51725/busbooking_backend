import { client } from "../index.js";
import { MONGO_DATABASE } from "../index.js";
import { ObjectId } from "mongodb";


export const createBus  = async(payload) => {
  const data = await client 
  .db(MONGO_DATABASE)
  .collection("buses")
  .insertOne(payload)

  if (data.insertedId){
      return{
          result : data,
          message : "bus added successfully"
      }
  }
}


export const getAllBuses = async() => {
   return await client 
   .db(MONGO_DATABASE)
   .collection ("buses")
   .find({})
   .toArray()
}

export const getBusesService = async (from, to, date) => {
  const query = {};

  if (from) {
    query.from = { $regex: from, $options: "i" }  
  };
  if (to){
    query.to = { $regex: to, $options: "i" }
  } ;
  if (date) {
    query.date = date;
  }

  return await client
    .db(MONGO_DATABASE)
    .collection("buses")
    .find(query)
    .toArray();
};


export const getBusByIdService  = async (id) => {
    const data = await client
    .db(MONGO_DATABASE)
    .collection("buses")
    .findOne({_id : new ObjectId(id)})

    if (data) {
        return  data
    }
    else{
        return null
    }
}


export const deleteBuses = async (id) => {
  const data = await client 
  .db(MONGO_DATABASE)
  .collection("buses")
  .deleteOne({_id : new ObjectId (id)})

  if (data.deletedCount === 0){
     return {
      message : "can not delete bus"
     }
  }
  else{
    return {
      message : "bus deleted successfully"
    }
  }
}

export const updateSeatsService = async (busId, seats, action) => {
  let updateQuery = {};

  if (action === "add") {
    updateQuery = {
      $push: {
        bookedSeats: { $each: seats },
      },
      $inc: {
        seatsAvailable: -seats.length,
      },
    };
  }

  if (action === "remove") {
    updateQuery = {
      $pull: {
        bookedSeats: { $in: seats },
      },
      $inc: {
        seatsAvailable: seats.length,
      },
    };
  }

  const result = await client
    .db(MONGO_DATABASE)
    .collection("buses")
    .updateOne(
      { _id: new ObjectId(busId) },
      updateQuery
    );

  return result;
};


