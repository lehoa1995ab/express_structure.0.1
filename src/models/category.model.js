import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = {
    create: async function (newCategory) {
        console.log("category", newCategory);
        try {
            const category = await prisma.categories.create({
                data: newCategory
            })
            //console.log("category", category);
            return {

                status: true,
                message: "them danh muc thah cong ",
                data:category

            }
        } catch (err) {
            if (err.meta?.target == "categories_title_key") {
                return {

                    status: false,
                    message: "danh muc da ton tai"

                }
            }
            return {

                status: false,
                message: "loi cu phap"

            }

        }
    },
    readMany: async function (status=undefined) {
        console.log("status", status);
        try {
            let categories = await prisma.categories.findMany({
                where:status==undefined?{
                    deleted:false
                }:{status,
                    deleted:false
                }
            })
            return {

                status: true,
                message: status==undefined ?"lay danh muc thah cong ":`laydanh muc ${status ?'hoat dong':"da dung hoat dong"} thanh cong`,
                data:categories

            }
        } catch (err) {
            return {
                status: false,
                message: "loi cu phap"

            }

        }
    },
    update: async function (categoryId,categoryEditData) {
       // console.log("category", newCategory);
        try {
            const categoryEdited = await prisma.categories.update({
                where: {
                    id:categoryId
                  },
                  data: categoryEditData
            })
            //console.log("category", category);
            return {

                status: true,
                message: "update danh muc thah cong ",
                data:categoryEdited

            }
        } catch (err) {
            return {

                status: false,
                message: "loi cu phap"

            }

        }
    },
    
}
