
const request = require('request');
const key = 'pdct.1.1.20170812T143647Z.86cc41d4ac1b423d.830897c0760ae78bf003e4fd4e027e93ce05a790';

exports.complete = function complite(starts, cb){
    var url = `https://predictor.yandex.net/api/v1/predict.json/complete?key=${key}&q=${encodeURIComponent(starts)}&lang=ru&limit=5`
    request(url, (err, res, body)=>{
        if (err) return cb(err);
        cb(err, JSON.parse(body))
    });
};