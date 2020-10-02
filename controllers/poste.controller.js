const { Poste } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res){
    let err, poste;
    let poste_info = req.body;

    [err, poste] = await to(poste.create(poste_info));
    if(err) return ReE(res, err, 422);

    return ReS(res, {poste:poste_json}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    let poste_json = Poste.findAll( raw: true);
    
    return ReS(res, {postes:poste_json.toWeb()});
}
module.exports.getAll = getAll;

const get = function(req, res){
    let poste = req.poste;

    return ReS(res, {poste:poste.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, poste, data;
    poste = req.poste;
    data = req.body;
    poste.set(data);

    [err, poste] = await to(poste.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {poste:poste.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let poste, err;
    poste = req.poste;

    [err, poste] = await to(poste.destroy());
    if(err) return ReE(res, 'error occured trying to delete the poste');

    return ReS(res, {message:'Deleted poste'}, 204);
}
module.exports.remove = remove;