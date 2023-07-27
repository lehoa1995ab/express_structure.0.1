import express from 'express';
const router = express.Router();

import categoryModel from '../models/category.model'

router.use("/", async (req,res)=>{
    let result = await categoryModel.readMany()
    console.log("result", result);
})



module.exports = router;