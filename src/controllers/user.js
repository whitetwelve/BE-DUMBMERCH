//  import model
const {user} = require('../../models')

// Post data user
exports.addUsers = async (req, res) => {
    try {

    const data = await user.create(req.body)

        res.send({
            status : 'Success',
            message : 'Data user berhasil ditambahkan!',
            data
        })

    } catch (error) {
        console.log(error);
        res.send({
            status : 'failed',
            message : 'Data user gagal ditambahkan!'
        })
    }
}