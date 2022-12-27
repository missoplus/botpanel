const express = require('express');
const router = express.Router();
const users = require('../../models/users');
const sessionChecker = require('../../middlewares/admin.middleware');

const createUser= async function (req, res) {
    try {

        const email = req.body.email;
        const password = req.body.password;
        const pass2 = req.body.confirmPassword;

        if (password === pass2) {
            const user = new users({
                email: req.body.email,
                password: req.body.password,
            });
            await user.save(function (err) {
                if (err) {
                    res.redirect("/auth/register");
                } else {
                    req.session.message = {
                        type: "success",
                        intro: "Welcome!",
                        message: "You have successfully registered.",
                    }
                    req.session.user = user;
                    res.redirect('/');
                }
            });
        } else {
            res.redirect('/auth/register');
        }
    } catch (error) {
        res.redirect('/auth/register');
    }
}
const loginView = async (req, res) => {
    res.render("admin/auth/login", {layout: false});
}
const registerView = async (req, res) => {
    res.render("admin/auth/register", {layout: false});
}
const logoutUser = (req, res) => {
    if (req.session.user) {
        req.session.destroy(function (user) {
            res.redirect("/auth/login");
        })
    } else {
        res.redirect("/auth/login");
    }
}
const loginUser= async function (req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (password && email) {
            const user = await users.findOne({email: email});
            if (user) {
                user.comparePassword(password, (error, match) => {
                    if (!match) {
                        res.redirect("/auth/login");
                    } else {
                        req.session.user = user;
                        res.redirect("/");
                    }
                });
            } else {
                res.redirect("/auth/login");
            }
        } else {
            res.redirect("/auth/login");
        }
    } catch (e) {
        console.log(e);
    }
}

    module.exports = {
        createUser,
        logoutUser,
        loginUser,
        loginView,
        registerView,
    }
