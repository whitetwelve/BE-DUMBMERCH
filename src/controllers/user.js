//  import model
const {user, profile} = require('../../models')

// Post data user
exports.addUsers = async (req, res) => {
    try {
        
        const data = req.body
    
        await user.create(data);
    
        res.send({
            status: "success",
            message: "Data user berhasil ditambahkan!"
        });
        } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
        }
    };

// Get all data users
exports.getUsers = async (req, res) => {
    try {
    
        const users = await user.findAll({
            include: {
                model: profile,
                as: 'profile'
            },
            attributes: {
                exclude: ['password','createdAt', 'updatedAt']
            }
        })
    
        res.send({
            status: "success",
            message: "Data berhasil ditampilkan!",
            data : {
                users
            }
        });
        } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
        }
    };

// GET USER BY ID
exports.getUser = async (req, res) => {
    try {
        const id = req.params.id
        
        const data = await user.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['password','createdAt', 'updatedAt']
            }
        });
    
        res.send({
            status: "success",
            message: `Data user dengan id : ${id} berhasil ditampilkan!`,
            data
        });
        } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
        }
    };
// GET PROFILE BY ID
exports.getProfile = async (req, res) => {
    try {
        const { id } = req.params

        const data = await profile.findAll({
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

// UPDATE DATA USER BY ID
exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id
        
        const data = req.body
        await user.update(data, {
            where :{
                id
            }
        });
    
        res.send({
            status: "success",
            message: `Update data user dengan id : ${id} berhasil!`,
            data
        });
        } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
        }
    };

// DELETE DATA USER BY ID
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const data = await user.findOne({
            where: {
                id
            }
        })

        if(!data){
            return res.send({
                message: `User data dengan id : ${id} tidak ditemukan!`
            })
        }

        await user.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: `Data user dengan id: ${id} berhasil dihapus!`
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}