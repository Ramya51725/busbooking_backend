import { getAdminDashboardService } from "../services/admin.service.js";
import { StatusCodes } from "http-status-codes";

const getAdminDashboard = async (req, res) => {
  try {
    const data = await getAdminDashboardService();

    res.status(StatusCodes.OK).json({
      dashboard: data,
      message: "Dashboard data fetched successfully"
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      error: err.message
    });
  }
};

export { getAdminDashboard };