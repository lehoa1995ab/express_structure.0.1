module.exports={
    getUserValidate:(req,res,next)=>{
        if(req.query.userId){
            if (isNaN(Number(req.query.userId))||req.query.userId <=0) {
                return res.status(400).json(
                    {
                        message:'user id phai la so nguyen duong '
                    }
                )
               
            }
            try{
                if(typeof JSON.parse(req.query.detail)!="boolean"){
                    return res.status(500).json({
                        message:"detail phai la true hoac false"
                    })
                }
            }catch(err){
                return res.status(500).json({
                    message:"detail phai la true hoac false"
                })
            }

           
            // if (isNaN(Number(req.query.detail))==NaN) {
            //     return res.status(500).json(
            //         {
            //             message:"detail phai la 1 hoac 0 "
            //         }
            //     )
            // }
        }
        next()
    }
}