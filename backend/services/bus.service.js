import { client } from "../index.js";
import { MONGO_DATABASE } from "../index.js";

export const getBusesService = async (from, to, date) => {
  const query = {};

  if (from) {
    query.from = { $regex: from, $options: "i" }  // $options: "i" ignore case
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


