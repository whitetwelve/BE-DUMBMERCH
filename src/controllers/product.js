const { product , user , category , categoryProduct } = require('../../models')


exports.getProducts = async (req, res) => {
    try {
        let data = await product.findAll({
            include: [
                {
                model : user,
                as    : "user",
                attributes: {
                    exclude: [ "createdAt" , "updatedAt" ]
            }
                },
            {
                model : category,
                as    : "categories",
                through: {
                    model : categoryProduct,
                    as    : 'bridge',
                    attributes : {
                        exclude : [ 'createdAt' , 'updateAt' ]
                    }
                },
                attributes : {
                    exclude : [ "createdAt" , "updatedAt" ],
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
            message : "Data produk berhasil ditampilkan!",
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

exports.getDetailProduct = async (req, res) => {
    try {
        const id   = req.params.id

        const data = await product.findOne({
            where : {
                id
            },
            attributes  : {
                exclude : [ 'createdAt' , 'updatedAt' , 'idUser' ]
            }
        })

    res.send({
            status  : 'Success!',
            message : `Data produk id :${id} berhasil ditampilkan!`,
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

exports.addProduct = async (req, res) => {
    try {

        const data = await product.create({
            ...req.body,
            image  : req.file?.filename,
            idUser : req.user.id
        })

        res.send({
            status  : 'Success!',
            message : 'Data produk berhasil ditambahkan!',
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

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id

        const data = await product.findOne({
            where : {
                id
            }
        })

        if(!data){
            return res.send({
                message:`Produk dengan id ${id} tidak ditemukan!`
            })
        }

        await product.destroy({
            where : {
                id
            }
        })

        res.send({
            status  : 'Success',
            message : `Produk dengan id ${id} berhasil dihapus!`
        })

    } catch (error) {
        console.log(error)
        res.send({
            status  : 'error',
            message : 'Server error!'
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        
        const data = req.body
        await product.update(data, {
            where : {
                id
            }
        })

        res.send({
            status  : "success",
            message : `Update data product dengan id : ${id} berhasil!`,
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