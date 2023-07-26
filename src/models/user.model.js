import {mySQL} from '../databases/mySQL';

module.exports = {
    getUsers: function() {
       return new Promise((resolve, reject) => {
        
            let queryString = `
                SELECT users.*
                FROM users
            `

            mySQL.query(queryString, (err, result) => {
                if(err) {
                    return resolve(
                        {
                            status: false,
                            message: "Lỗi trong quá trình truy vấn!"
                        }
                    )
                }

                return resolve(
                    {
                        status: true,
                        message: "Get users thành công!",
                        data: result
                    }
                )
            })
       }).catch(err => {
            //console.log("Promise gặp lỗi cú pháp!", err)
            return {
                status: false,
                message: "Lỗi không xác định!"
            }
       })
    },
    getUserById: function(userId) {
        return new Promise((resolve, reject) => {
         
             let queryString = `
                SELECT users.*
                FROM users
                WHERE users.id = ${userId}
             `
 
             mySQL.query(queryString, (err, result) => {
                 if(err) {
                     return resolve(
                         {
                             status: false,
                             message: "Lỗi trong quá trình truy vấn!"
                         }
                     )
                 }
 
                 return resolve(
                     {
                         status: true,
                         message: "Get users by idthành công!",
                         data: result
                     }
                 )
             })
        }).catch(err => {
             //console.log("Promise gặp lỗi cú pháp!", err)
             return {
                 status: false,
                 message: "Lỗi không xác định!"
             }
        })
     },
    getUserDetailById: function(userId) {
        return new Promise((resolve, reject) => {
         
             let queryString = `
                SELECT users.*, user_address.id as addressId, user_address.name as addressName, user_address.provinceId, user_address.wardId
                FROM users
                LEFT JOIN user_address on users.id = user_address.userId
                WHERE users.id = ${userId}
             `
 
             mySQL.query(queryString, (err, result) => {
                 if(err ||result.length==0) {
                     return resolve(
                         {
                             status: false,
                             message: result.length == 0 ? "UserId không tồn tại" : "Lỗi trong quá trình truy vấn!"
                         }
                     )
                 }
                 //console.log("result", result)
                let user;
                for (let i in result) {
                    if (!user) {
                        user = {
                            id: result[i].id,
                            name: result[i].name,
                            email: result[i].email,
                            address: 
                                result[i].addressId 
                                ? 
                                [
                                    {
                                        id:   result[i].addressId,
                                        name: result[i].addressName,
                                        provinceId: result[i].provinceId,
                                        wardId: result[i].wardId,
                                    }
                                ]
                                :
                                []
                        }
                        continue;
                    }
                    user.address.push(
                        {
                            id:   result[i].addressId,
                            name: result[i].addressName,
                            provinceId: result[i].provinceId,
                            wardId: result[i].wardId,
                        }
                    )
                }
                // if(result==""){ 
                //     return resolve(
                //     {
                //         status: true,
                //         message: "Get users khong ton tai!"
                        
                //     }
                // )}
                // else{
                //     return resolve(
                //         {
                //             status: true,
                //             message: "Get users thành công!",
                //             data: user
                //         }
                //     )
                // }
                return resolve(
                    {
                        status: true,
                        message: "Get users thành công!",
                        data: user
                    }
                )
            
            
             })
        }).catch(err => {
             //console.log("Promise gặp lỗi cú pháp!", err)
             return {
                 status: false,
                 message: "Lỗi không xác định!"
             }
        })
     },
    createUser: function(newUser) {
        return new Promise((resolve, reject) => {
         
            //  let queryString = `
            //     INSERT INTO users (id, name, email) 
            //     VALUES (NULL, "${newUser.name}", "${newUser.email}")
            //  `
 
            let queryString = `
                INSERT INTO users SET ?
             `
             mySQL.query(queryString, newUser, async (err, result) => {
                 if(err) {
                    //console.log("lỗi truy vấn", err)
                     return resolve(
                         {
                             status: false,
                             message: err.code == "ER_DUP_ENTRY" ? "Email đã tồn tại" : "Lỗi truy vấn!"
                         }
                     )
                 }
                 let insertData = await this.getUserById(result.insertId);
                 return resolve(
                     {
                         status: true,
                         message: "Insert user thành công!",
                         data: insertData.status ? insertData.data : {}
                     }
                 )
             })
        }).catch(err => {
             //console.log("Promise gặp lỗi cú pháp!", err)
             return {
                 status: false,
                 message: "Lỗi không xác định!"
             }
        })
     },
     deleteUser: function (userId) {
        return new Promise((resolve, reject) => {
            let queryString = `
                DELETE 
                FROM users 
                WHERE users.id = ${userId}
            `
            mySQL.query(queryString, (err, result) => {
                if (err) {
                    return resolve(
                        {
                            status: false,
                            message: err.code == "ER_ROW_IS_REFERENCED_2" ? "User đang dính khóa ngoại" : "Lỗi trong quá trình truy vấn!"
                        }
                    )
                }
                return resolve(
                    {
                        status: true,
                        message: "Delete users thành công!",
                        data: result
                    }
                )

            })
        }).catch(err => {
            // console.log('Promise gap loi cu phap', err);
            return {
                status: false,
                message: 'Loi khong xac dinh!'
            }
        })
    },
    updateUserById: function (userId,updateData) {
        return new Promise((resolve, reject) => {
            let queryString = `
            UPDATE users
            SET name='${updateData.name}',email='${updateData.email}'
            WHERE users.id=${userId}
            `
            mySQL.query(queryString, (err, result) => {
                if (err) {
                    console.log("err that bai",err);
                    return resolve(
                        {
                            status: false,
                            message:  "Lỗi khong xac dinh !"
                        }
                    )
                }
                return resolve(
                    {
                        status: true,
                        message: "truy van  thành công!",
                    }
                )

            })
        }).catch(err => {
            // console.log('Promise gap loi cu phap', err);
            return {
                status: false,
                message: 'Loi khong xac dinh!'
            }
        })
    },
    updateFieldUserById: function (userId,patchData) {
        return new Promise((resolve, reject) => {
            console.log('userId',userId);
            console.log('patchData',patchData);
            let patchString=``;
            for(let i in patchData) {
                patchString+=`${i}="${patchData[i]}",`
            }
            let queryString = `
            UPDATE users
            SET ${patchString.substring(0,patchString.length-1)}
            WHERE users.id=${userId}
            `
            mySQL.query(queryString, (err, result) => {
                if (err) {
                    console.log("err that bai",err);
                    return resolve(
                        {
                            status: false,
                            message:  "Lỗi khong xac dinh !"
                        }
                    )
                }
                return resolve(
                    {
                        status: true,
                        message: "truy van  thành công!",
                    }
                )

            })
        }).catch(err => {
            // console.log('Promise gap loi cu phap', err);
            return {
                status: false,
                message: 'Loi khong xac dinh!'
            }
        })
    },
    
}

