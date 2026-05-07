import { analyticsService } from "@/service/analyticService";
import { NextFunction, Request, Response } from "express";
import ExcelJS from "exceljs";

export const analyticsController = {
    getConversionRates : async (req: Request, res: Response, next: NextFunction
    ) => {
        try {
            const data = await analyticsService.getConversionRates();

            return res.json(data);
        } catch (err) {
            next(err);
        }

    },

    exportConvertion :  async (req: Request, res: Response, next: NextFunction
    ) => {
        try {
          const rows = req.body;
                      if (!rows) {
                          throw new Error("no rows");
                      }
          
                      const workbook = new ExcelJS.Workbook();
                      const sheet = workbook.addWorksheet("Forecast");
          
                      // -------- Header --------
                      sheet.addRow(["상풍명", "클릭수", "구매수", "전환율 (%)"]);
          
                      // -------- Data --------
                      req.body.rows.forEach((r: any) => {
                          sheet.addRow([r.productName, r.clicks, r.orders, r.conversionRate]);
                      });
          
                      // -------- 스타일 (옵션)
                      sheet.columns = [
                          { width: 15 },
                          { width: 20 },
                          { width: 20 },
                          { width: 20 }
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

};