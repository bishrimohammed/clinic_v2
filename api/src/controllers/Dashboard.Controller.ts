import { Request, RequestHandler, Response } from "express";

import { dashboardService } from "../services";

const asyncHandler = require("express-async-handler");

// module.exports = DashboardController = {
export const getDashboardData: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await dashboardService.getDashboardData(req);
    res.json(data);
  }
);
export const getUpcomingAppointmentData: RequestHandler = asyncHandler(
  async (
    req: Request<{}, {}, {}, { appintmentDate: string }>,
    res: Response
  ) => {
    const appintmentData = await dashboardService.getActiveAppointments(req);
    res.json(appintmentData);
  }
);
//get upcomig patient visit
export const getUpcomingPatientVisitData = asyncHandler(
  async (req: Request, res: Response) => {
    const visitData = await dashboardService.getActivePatientVisit(req);
    res.json(visitData);
  }
);
//get doctor working hour
export const getDoctorWorkingHourData = asyncHandler(
  async (req: Request, res: Response) => {
    // 7 day of week
    const DoctorsWorkingHours = await dashboardService.getDoctorWorkingHours();
    res.json(DoctorsWorkingHours);
  }
);

export const getLabInvestigationData = asyncHandler(
  async (req: Request, res: Response) => {
    const labData = await dashboardService.getLabInvestigationData();
    res.json(labData);
  }
);

export const getPaymentData = asyncHandler(
  async (req: Request, res: Response) => {
    const paymentData = await dashboardService.getPaymentData();
    res.json(paymentData);
  }
);
