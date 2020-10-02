const { Candidat } 	    = require('../models');
const validator     = require('validator');
const { to, TE }    = require('../services/util.service');

const getUniqueKeyFromBody = function(body){
    let unique_key = body.unique_key;
    if(typeof unique_key==='undefined'){
        if(typeof body.phone != 'undefined'){
            unique_key = body.phone
        }else{
            unique_key = null;
        }
    }

    return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createCandidat = async (candidatInfo) => {
    let unique_key, auth_info, err;

    auth_info={};
    auth_info.status='create';

    unique_key = getUniqueKeyFromBody(candidatInfo);
    if(!unique_key) TE('A phone number was not entered.');

    if(validator.isMobilePhone(unique_key, 'any')){//checks if only phone number was sent
        auth_info.method = 'phone';
        candidatInfo.phone = unique_key;

        [err, candidat] = await to(Candidat.create(candidatInfo));
        if(err) TE('candidat already exists with that phone number');

        return candidat;
    }else{
        TE('A valid phone number was not entered.');
    }
}
module.exports.createCandidat = createCandidat;

const authCandidat = async function(candidatInfo){//returns token
    let unique_key;
    let auth_info = {};
    auth_info.status = 'login';
    unique_key = getUniqueKeyFromBody(candidatInfo);

    if(!unique_key) TE('Please enter a phone number to login');


    if(!candidatInfo.password) TE('Please enter a password to login');

    let candidat;
   if(validator.isMobilePhone(unique_key, 'any')){//checks if only phone number was sent
        auth_info.method='phone';

        [err, candidat] = await to(Candidat.findOne({where:{phone:unique_key }}));
        if(err) TE(err.message);

    }else{
        TE('A valid phone number was not entered');
    }

    if(!candidat) TE('Not registered');

    [err, candidat] = await to(Candidat.comparePassword(candidatInfo.password));

    if(err) TE(err.message);

    return candidat;

}
module.exports.authCandidat = authCandidat;