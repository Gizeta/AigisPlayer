'use strict';

const http = require('http');
const request = require('request');
const express = require('express');

module.exports = {
    createServer : function(){
        console.log(__dirname);
        let app = express();
        app.use(function(req,res,next){
            res.header("Access-Control-Allow-Origin","*");
            next();
        })
        app.use(express.static('cache'));
        app.use(function(req,res){
            let headers = req.headers;
            headers.host = "http://assets.millennium-war.net";
            let options = {
                url: 'http://assets.millennium-war.net' + req.path,
                headers:headers
            };
            request(options,function(err,res,body){
                console.log(body);
            }).pipe(res);
        });
        try{
            http.createServer(app).listen('19980',function(){
                console.log('CreateProxyServer on 19980');
            });
        }
        catch(e){
            
        }
    }
}