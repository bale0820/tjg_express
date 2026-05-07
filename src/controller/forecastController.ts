import { forecastService } from "@/service/forecastService";
import { NextFunction, Request, Response } from "express";
import ExcelJS from "exceljs";

export const forecastController = {
    getDailySales: async (req: Request, res: Response, next: NextFunction) => {
        const ppk = req.params.ppk as string;

        if (!ppk) {
            throw new Error("no ppk");
        }

        const dailySales = await forecastService.getDailySales(ppk);
        return res.json(dailySales);
    },


    runForecast: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ppk = req.params.ppk as string;
            const result = await forecastService.runForecast(ppk);
            return res.json(result);
            if (!ppk) {
                throw new Error("no ppk");
            }

        } catch (err) {
            next(err);
        }
    },



    exportForecast: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const rows = req.body;
            if (!rows) {
                throw new Error("no rows");
            }

            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet("Forecast");

            // -------- Header --------
            sheet.addRow(["구분", "날짜", "예측값"]);

            // -------- Data --------
            req.body.rows.forEach((r: any) => {
                sheet.addRow([r.type, r.date, r.value]);
            });

            // -------- 스타일 (옵션)
            sheet.columns = [
                { width: 15 },
                { width: 20 },
                { width: 15 }
            ];

            // -------- 다운로드 --------
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=forecast.xlsx"
            );
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );

            await workbook.xlsx.write(res);
            res.end();



        } catch (err) {
            next(err);
        }
    }



}
