import { NextFunction, Request, Response } from "express";
import { updateUserBios } from "../service/update.service";
import fs from 'fs'


class updatedata{
        async updateUser(){
            console.log("============================,usercontroller")
        try {
            await updateUserBios();
           console.log("User bios updated successfully");
        } catch (error) {
            console.error("Error updating user bios:", error);
        }        
    }
    async uploadExcel(req:Request,res:Response){
        if (!req.file) {
            return res.status(400).send('No file uploaded');
          }
          let xlsx = require("xlsx")
          const workbook = xlsx.readFile(req.file.path);
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = xlsx.utils.sheet_to_json(sheet);
          const jsonFilename = req.file.filename.replace(/\.[^/.]+$/, ".json");
          const jsonFilePath = `./uploads/${jsonFilename}`;
          fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
          fs.unlinkSync(req.file.path);
        res.send('File uploaded successfully');
    }

    async uploadchunks(req:Request,res:Response){
        try {
            if (!req.file) {
              return res.status(400).send('No file uploaded.');
            }
            const xlsx = require("xlsx");
            const workbook = xlsx.readFile(req.file.path);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const range = xlsx.utils.decode_range(sheet['!ref']);
            console.log("range===================", range);
            console.log("-----------------------", range.e.r);
            const rowCount = range.e.r + 1;
            const chunkSize = 5000;
        
            // Extract headers
            const headers = [];
            for (let c = range.s.c; c <= range.e.c; c++) {
              const cellAddress = xlsx.utils.encode_cell({ r: range.s.r, c: c });
              const cell = sheet[cellAddress];
              headers.push(cell ? cell.v : undefined);
            }
           const consolidatedData =[];
            for (let i = 0; i < rowCount; i += chunkSize) {
              console.log("=====================>");
              const rangeStart = i + 1;
              console.log("rangeStart================", rangeStart);
              const rangeEnd = Math.min(i + chunkSize, rowCount);
              console.log("rangeEnd------------------->", rangeEnd);
              // Extract data for the chunk
              const data = [];
              for (let r = rangeStart; r <= rangeEnd; r++) {
                const row:any = {};
                for (let c = range.s.c; c <= range.e.c; c++) {
                  const cellAddress = xlsx.utils.encode_cell({ r: r, c: c });
                  const cell = sheet[cellAddress];
                  row[headers[c]] = cell ? cell.v : undefined;
                }
                data.push(row);
              }
              consolidatedData.push(...data);
            }
            const jsonData = JSON.stringify(consolidatedData);
            const fileName = `uploads/consolidated_data.json`;
              fs.writeFileSync(fileName, jsonData);
              fs.unlinkSync(req.file.path);
            res.send('file uploaded and read successfully!');
          }
        catch (error) {
          console.error('Error uploading file:', error);
          res.status(500).send('Error uploading file.');
        }

    }

 }
export const getdata=new updatedata();