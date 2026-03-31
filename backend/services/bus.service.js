import { client } from "../index.js";
import { MONGO_DATABASE } from "../index.js";
import { ObjectId } from "mongodb";


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

