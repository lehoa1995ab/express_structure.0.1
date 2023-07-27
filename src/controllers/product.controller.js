import productModel from "../models/product.model";
module.exports = {
    getProducts: function (req, res) {
        try {
            let result = productModel.getProducts();
            if (result.status) {
                return res.status(200).json(
                    {
                        message: result.message,
                        data: result.data
                    }
                )
            } else {
                return res.status(500).json({
                    message: result.message,
                })
            }
        } catch (err) {
            return res.message(500).json(
               {
                message: 'loi cu phap',
               }
            )
        }


    },
    createProduct: function (req, res) {
        let result = productModel.createProduct(req.body);
    },
    createProductDefault: function (req, res) {
        let result = productModel.createProductDefault();
    }
}