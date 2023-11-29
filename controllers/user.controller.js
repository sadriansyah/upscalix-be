const FailedJobs = require("../models/failedJobs.model");
const User = require("../models/user.model");

exports.create = async (req, res) => {

    try {
        const { firstName, lastName, birthday, location} = req.body;

        const user = await User.create({
            firstName, lastName, birthday, location
        });

        return res.status(201).json({
            status:201,
            message: "User Successfully Created",
            data: {
                user: user
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        })
    }
}

exports.all = async(req, res) => {
    const user = await User.findAll();
    return res.status(200).json({
        status:200,
        data: {
            user
        }
    });
}

exports.find = async(req, res) => {
    const { id } = req.params;
    const user = await User.findOne({
        where: {
            id:id,
        }
    });
    if(!user){
        return res.status(404).json({
            status:404,
            message: "User not found"
        });
    }

    return res.status(200).json({
        status:200,
        data: {
            user:user
        }
    });
}

exports.update = async(req, res) => {
    const { id } = req.params;

    const updated = await User.update(req.body, {
        where: {
            id: id
        }
    });

    if(!updated[0]){
        return res.status(200).json({
            status:200,
            message: "Failed to update user"
        });
    }

    return res.status(200).json({
        status:200,
        message: "User Updated"
    })
}

exports.destroy = async (req, res) => {
    const {id} = req.params;

    const destroyed = await User.destroy({
        where: {
            id: id
        }
    });

    if(!destroyed){
        return res.status(200).json({
            status:200,
            message: "Failed to delete user"
        });
    }

    return res.status(200).json({
        status:200,
        message: "Users Delete"
    });
}

exports.cobacoba = async (req, res) => {
    const testuser = await FailedJobs.findAll({
        attributes: ['userId'],
        include:[
            {model: User, attributes:['firstName','birthday']}
        ]
    });

    return res.status(200).json({
        status:200, usertest:testuser
    })
}