const { user, transaction, product } = require('../../models')

exports.getTransactions = async (req, res) => {
    try {

        const data = await transaction.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idBuyer', 'idSeller', 'idProduct']
            },
            include: [
                {
                    model: product,
                    as: 'product',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'idUser', 'qty', 'price']
                    }
                },
                {
                    model: user,
                    as: 'buyer',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status']
                    }
                },
                {
                    model: user,
                    as: 'seller',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status']
                    }
                },
            ]
        })

        res.send({
            status: 'success',
            message : 'Data transaksi berhasil ditampilkan!',
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

exports.addTransaction = async (req, res) => {
    try {
        const data = req.body

        await transaction.create(data)

        res.send({
            status  : 'success',
            message : 'Data transaksi berhasil ditambahkan!'
        })

    } catch (error) {
        console.log(error)

        res.send({
            status  : 'failed',
            message : 'Server Error'
        })
    }
}

exports.deleteTransaction = async (req, res) => {
    try {
        const id = req.params.id

        const data = await transaction.findOne({
            where : {
                id
            }
        })

        if(!data){
            return res.send({
                message :`Transaksi dengan id ${id} tidak ditemukan!`
            })
        }

        await product.destroy({
            where : {
                id
            }
        })

        res.send({
            status  : 'Success',
            message : `Transaksi dengan id ${id} berhasil dihapus!`
        })

    } catch (error) {
        console.log(error)
        
        res.send({
            status  : 'error',
            message : 'Server error!'
        })
    }
}