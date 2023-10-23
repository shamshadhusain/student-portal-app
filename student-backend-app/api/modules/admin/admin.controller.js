const mongoose = require('mongoose');
const Admin = require('./admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.admin_signUp = async(req, res) => {
    try { 
        const admin = await Admin.find({ email: req.body.email });
        console.log(admin);
        if (usadminer.length >= 1) {
            return res.status(409).json({
                message: "Mail already exist!"
            });
        } else {
            //bcrypt..
            console.log("debuger-1");
            bcrypt.hash((req.body.password).trim(), 10, async (err, hash) => {
                console.log("Debugger-2");
                if (!err) {
                    console.log("Debugger-3");
                        const student = new Admin({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        console.log(student);
                    try {
                        const stud = await student.save();
                        return res.json({
                            message: "Admin saved.",
                            stud
                        });
                    } catch (err) {
                        return res.json({
                            error: err,
                            message: "Admin not Saved."
                        });
                    }
                } else {
                    return res.json({
                        error: err,
                        message:"Hashing Error!!!"
                    });
                }
            });
        }
    } catch (err) {
        return res.json({
            error: err,
            message: "Not find.."
        });
    }        
};

exports.admin_logIn = async(req, res) => {
   console.log(req, res, "req, res")
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        console.log("admin_logIn", admin)
        bcrypt.compare(req.body.password, admin.password, (err, result) => {
            console.log("Hello2 bcrypt");
            if (result) {
                const token = jwt.sign(
                    {
                        email: admin.email,
                        _id: admin._id,
                    },
                    process.env.JWT_TOKEN,
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: 'Auth Successful',
                    token: token
                });
            } else {
                console.log("Hello3 err");
                return res.status(401).json({
                    message: 'Auth failed..!'
                });
            }
        });
    } catch (err) {
        res.json({
            message: 'Not found in admin_logIn!!!',
            error: err
        });
    }
};  

exports.admin_delete = async (req, res) => {
    try {
        const removedUser = await Admin.remove({
            _id: req.params.id
        });
        res.json(removedUser);
    } catch (err) {
        res.json({
            message: err
        });
    }
};

exports.admin_update = async (req, res) => {
    try {
        const updateAdmin = await Admin.updateOne({ _id: req.params.id }, { $set: { email: req.body.email } });  
    } catch (err) {
        res.json({
            message: err
        })
    }
}

exports.admin_getAll = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json({
            admins: admins
        });
    } catch (err) {
        res.json({
            message: "Not avaiable.."
        });
    }
}

exports.getResponse = (req, res) => {
    res.status(200).json(
        {
            message: "Hello World!!!"
        }
    );  
};

