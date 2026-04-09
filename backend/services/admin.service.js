import { MONGO_DATABASE, client } from "../index.js";

const getAdminDashboardService = async () => {
  const db = client.db(MONGO_DATABASE);

  const totalBuses = await db.collection("buses").countDocuments();
  const totalUsers = await db.collection("users").countDocuments();
  const totalBookings = await db.collection("bookings").countDocuments();

  const revenueResult = await db.collection("bookings").aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalAmount" } 
      }
    }
  ]).toArray();

  const totalRevenue = revenueResult[0]?.totalRevenue || 0;

  return {
    totalBuses,
    totalUsers,
    totalBookings,
    totalRevenue
  };
};

export { getAdminDashboardService };

