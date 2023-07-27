module.exports={
    createValidate:function(req,res,next){
        if (req.body==undefined) {
            res.status(500).json({
                message: " truyen them danh muc muon them"
            })
            
        }
        if(req.body.title?.length>15 || req.body.title?.length<6 ||req.body.title ==undefined){
            res.status(500).json({
                message: "ten danh muc phai tu 6 den 15 ki tu"
            })

        }
        if(req.body.avatar ==undefined){
            res.status(500).json({
                message: "phai them anh dai dien cho danh muc "
            })

        }
        req.body={
            title:req.body.title,
            avatar:req.body.avatar
        }
        next();
    }
}