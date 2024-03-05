import express from "express";
import { getdata } from "../controller/update.controller";
import { upload } from "../../multer.config";

export const router= express();
console.log("========================++++++++++++++++++++++")
router.post('/update',getdata.updateUser)
router.post('/upload', upload.single('excelFile'),getdata.uploadExcel);
router.post('/upload/chunk', upload.single('file'),getdata.uploadchunks);