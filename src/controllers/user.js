// IMPORT MODELS
const { user , profiles } = require('../../models')


exports.addUsers = async (req, res) => {
    try {
        
        const data = req.body
    
        await user.create(data)
    
        res.send({
            status  : "success",
            message : "Data user berhasil ditambahkan!"
        })

    } catch (error) {
        console.log(error)

        res.send({
            status  : "failed",
            message : "Server Error"
        })
    }
}


exports.getUsers = async (req, res) => {
    try {
    
        const users = await user.findAll({
            include : {
                model : profiles,
                as    : 'profile'
            },
            attributes : {
                exclude : [ 'password' , 'createdAt' , 'updatedAt' ]
            }
        })
    
        res.send({
            status  : "success",
            message : "Data berhasil ditampilkan!",
            data    : {
                users
            }
        })

    } catch (error) {
        console.log(error)

        res.send({
            status  : "failed",
            message : "Server Error"
        })
    }
}


exports.getUser = async (req, res) => {
    try {
        const id = req.params.id
        
        const data = await user.findOne({
            where : {
                id
            },
            attributes : {
                exclude : [ 'password' , 'createdAt' , 'updatedAt' ]
            }
        })
    
        res.send({
            status  : "success",
            message : `Data user dengan id : ${id} berhasil ditampilkan!`,
            data
        })

    } catch (error) {
        console.log(error)

        res.send({
            status  : "failed",
            message : "Server Error"
        })
    }
}


exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id
        
        const data = req.body

        await user.update(data, {
            where : {
                id
            }
        })
    
        res.send({
            status  : "success",
            message : `Update data user dengan id : ${id} berhasil!`,
            data
        })

    } catch (error) {
        console.log(error)

        res.send({
            status  : "failed",
            message : "Server Error"
        })
    }
}


exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const data = await user.findOne({
            where : {
                id
            }
        })

        if(!data){
            return res.send({
                message : `User data dengan id : ${id} tidak ditemukan!`
            })
        }

        await user.destroy({
            where : {
                id
            }
        })

        res.send({
            status  : 'success',
            message : `Data user dengan id: ${id} berhasil dihapus!`
        })

    } catch (error) {
        console.log(error)

        res.send({
            status  : 'failed',
            message : 'Server Error'
        })
    }
}


exports.getProfile = async (req, res) => {
    try {
        const { id } = req.params

        const data = await profiles.findAll({
            where: {
                id
            },
            include: {
                model: user,
                as: 'Data User'
            }
        })

        res.send({
            status: 'success',
            message:`data profile dengan id: ${id} berhasil ditampilkan!`,
            data
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}


exports.updateProfile = async (req, res) => {
    try {
        const id = req.params.id

        let data = req.body
        
        await profiles.update(data, {
            where : {
                id
            }
        })
    
        res.send({
            status  : "success",
            message : `Update profile dengan id : ${id} berhasil!`,
            data
        })

    } catch (error) {
        console.log(error)

        res.send({
            status  : "failed",
            message : "Server Error"
        })
    }
}


exports.addProfile = async (req, res) => {
    try {

        let datas = req.body

        const data = await profiles.create({
            ...datas,
            image : req.file?.filename
        })


        res.send({
            status  : 'Success!',
            message : 'Data profile berhasil ditambahkan!',
            data
        })

    } catch (error) {
        console.log(error)

        res.status(500).send({
            status  : 'failed',
            message : 'Server Error'
        })
    }
}


exports.getProfiles = async (req, res) => {
    try {

        let data = await profiles.findAll({
            include : [
                {
                model : user,
                as    : "Data User",
                attributes : {
                    exclude : [ "createdAt" , "updatedAt" ]
                }
            }
        ],
            attributes : {
                exclude : [ 'createdAt' , 'updatedAt' , 'idUser' ]
            }
        })

        data = data.map((item) => {
            item.image = 'http://localhost:5000/uploads/' + item.image

            return item
        })
        
        res.send({
            status  : 'Success!',
            message : "Data profiles berhasil ditampilkan!",
            data
        })

    } catch (error) {
        console.log(error)

        res.send({
            status  : 'failed',
            message : 'Server Error'
        })
    }
}