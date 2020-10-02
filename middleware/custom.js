const Poste 			    = require('./../models').poste;
const { to, ReE, ReS } = require('../services/util.service');

let poste = async function (req, res, next) {
    let posteId, err, poste;
    posteId = req.params.posteId;

    [err, poste] = await to(Poste.findOne({where:{posteid:posteId}}));
    if(err) return ReE(res, "err finding Poste");

    if(!poste) return ReE(res, "Poste not found with posteid: "+posteId);
    
    req.poste = poste;
    next();
}
module.exports.poste = Poste;