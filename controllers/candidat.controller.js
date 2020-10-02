const { Candidat }          = require('../models');
const authService       = require('../services/auth.service');
const { to, ReE, ReS }  = require('../services/util.service');

const create = async function(req, res){
    const body = req.body;

    if(!body.unique_key && !body.email){
        return ReE(res, 'Please enter an email to register.');
    } else if(!body.unique_key && !body.phone){
        return ReE(res, 'Please enter a phone number to register.');
    }else if(!body.password){
        return ReE(res, 'Please enter a password to register.');
    }else{
        let err, candidat;

        [err, candidat] = await to(authService.createCandidat(body));

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new candidat.', candidat:candidat.toWeb(), token:candidat.getJWT()}, 201);
    }
}
module.exports.create = create;

const get = async function(req, res){
    let candidat = req.candidat;

    return ReS(res, {candidat:candidat.toWeb()});
}
module.exports.get = get;

const getAll = async function(req, res){
    let candidat_json = Candidat.findAll( raw: true);
    
    return ReS(res, {candidats:candidat_json.toWeb()});
}
module.exports.getAll = getAll;

const update = async function(req, res){
    let err, candidat, data
    candidat = req.candidat;
    data = req.body;
    candidat.set(data);

    [err, candidat] = await to(candidat.save());
    if(err){
        if(err.message=='Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    return ReS(res, {message :'Updated Candidat: '+candidat.email});
}
module.exports.update = update;

const remove = async function(req, res){
    let candidat, err;
    candidat = req.candidat;

    [err, candidat] = await to(candidat.destroy());
    if(err) return ReE(res, 'error occured trying to delete candidat');

    return ReS(res, {message:'Deleted Candidat'}, 204);
}
module.exports.remove = remove;


const login = async function(req, res){
    const body = req.body;
    let err, candidat;

    [err, candidat] = await to(authService.authCandidat(req.body));
    if(err) return ReE(res, err, 422);

    return ReS(res, {token:candidat.getJWT(), candidat:candidat.toWeb()});
}
module.exports.login = login;