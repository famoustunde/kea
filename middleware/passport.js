const { ExtractJwt, Strategy } = require('passport-jwt');
const { Candidat }      = require('../models');
const CONFIG        = require('../config/config');
const {to}          = require('../services/util.service');

module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = CONFIG.jwt_encryption;

    passport.use(new Strategy(opts, async function(jwt_payload, done){
        let err, candidat;
        [err, candidat] = await to(Candidat.findById(jwt_payload.candidatId));

        if(err) return done(err, false);
        if(candidat) {
            return done(null, candidat);
        }else{
            return done(null, false);
        }
    }));
}