const pyke = require('../Pyke/index'),
    api = new pyke("Your API Key");

const enmap = require('enmap');
const PersistantCollection = require('enmap-level');

// Initialisation

var loleuw_data = new enmap({
    provider: new PersistantCollection({
        name: 'EUW1'
    })
});
var lolna_data = new enmap({
    provider: new PersistantCollection({
        name: 'NA1'
    })
});

var region_user = 'euw1';
var pseudo = "SP Jason";

async function save_region(region_user) {
    return new Promise((resolve, reject) =>{
        switch (region_user) {
            case 'euw1':
                resolve(loleuw_data);
                break;
            case 'na1' || 'na' :
                resolve(lolna_data);
                break;
            default:
            reject('Database not found');
                break;
        }
    })
}

(async function Exemple(region_user, pseudo) {
    await save_region(region_user).then( async database =>{
        await api.summoner.getBySummonerName(pseudo, region_user)
            .then(data =>{
                var update = new Date.now();
                console.log(data);
                database.get(data.id, {
                  summoner: {
                    update: update,
                    summoner_info: data
                  }
                });
            })
            .catch(error =>{
                return console.error(error)
            })

    }).catch(err =>{
        console.error(err);
    })
})

