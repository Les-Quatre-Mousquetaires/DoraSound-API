'use strict'

const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');
const config = require('../../config/index');

const { grantPermission } = require('../commons/grantPermisson');
const { customFilter } = require('../commons/plainObject');

function getToken(user) {
    let { _id, role } = user;
    let token = jwt.sign({
        userId: _id,
        role: role
    }, config.jwt.key, {
        expiresIn: '7d'
    });
    return token;
}

module.exports = {
    login: (req, res, next) => {
        let { user } = req;
        let token = getToken(user);
        user.token = token;
        user.password = 'N/A';
        User.findByIdAndUpdate(user._id, { token: token });
        return res.status(200).json(user);
    },

    loginRequired: (req, res, next) => {
        res.status(200).json({
            mess: 'yêu cầu bạn phải login lại'
        })
    },

    ggAuth: (req, res, next) => {
        let { user } = req;
        let token = getToken(user);
        user.token = token;
        user.password = 'N/A';
        User.findByIdAndUpdate(user._id, { token: token });
        return res.status(200).json(user);
    },

    fbAuth: (req, res, next) => {
        console.log(req);
        res.status(200).send('OK');
    },

    index: async (req, res, next) => {
        let { permission } = grantPermission('read:user', req.user, null);
        if (!permission.granted) next();

        let user = await User.find().lean().catch(err => { res.status(500).json({ message: err.errmsg }) });
        if (user) {
            let { resData } = customFilter(permission, user);
            res.status(200).json(resData);
        } else next();
    },

    new: (req, res, next) => {
        let user = new User(req.body);
        user.save().then(result => {
            res.status(201).send(user);
        }).catch(err => {
            res.status(500).json({ mess: err.message });
        });
    },

    view: async (req, res, next) => {
        let { resourceId } = req.params;
        let user = await User.findById(resourceId)
            .select('-password -__v').catch(err => { res.status(500).json({ message: err.errmsg }) });

        if (user) {
            let { permission } = grantPermission('read:user', req.user, user._id);
            if (!permission.granted) next();
            let { resData } = customFilter(permission, user);
            res.status(200).json(resData);
        } else next();
    },

    update: async (req, res, next) => {
        let { resourceId } = req.params;

        let { permission } = grantPermission('update:user', req.user, resourceId);
        if (!permission.granted) next();
        else {
            let userBody = req.body;
            let user = await User.findOneAndUpdate(
                { _id: resourceId },
                { $set: userBody },
                { new: true }).catch(err => { res.status(500).json({ message: err.errmsg }) });

            if (user) {
                let { resData } = customFilter(permission, user);
                res.status(201).json(resData);
            } else next();
        }

    },

    delete: async (req, res, next) => {
        let { resourceId } = req.params;

        let { permission } = grantPermission('update:user', req.user, resourceId);
        if (!permission.granted) next();
        else {
            let user = await User.findOneAndDelete({ _id: resourceId }).catch(err => { res.status(500).json({ message: err.errmsg }) });
            if (user)
                res.status(200).json({ message: `Deleted user id:${user._id}` });
            else next();
        }
    },
}