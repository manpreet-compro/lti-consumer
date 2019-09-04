const oauth = require('oauth-sign');
const nonce = require('nonce')();

const ltiFields = require('../ltiFields');
const config = require('../config');

exports.renderHomePage = (req, res)=>{
    res.render('index.ejs',{
        title: config.appName,
        ltiFields: ltiFields
    })
}

exports.handleLtiLaunch = (req,res)=>{
    let formFields = Object.assign({},req.query);

    //remove additional fields
    delete formFields.tool_provider_url;
    delete formFields.tool_secret;

    //add computed fields
    formFields.oauth_timestamp = Math.round(Date.now() / 1000);
    formFields.oauth_nonce = nonce();

    let method = "POST";
    let action = req.query.tool_provider_url;
    let secret = req.query.tool_secret;
    
    formFields.oauth_signature = oauth.hmacsign(method, action, formFields, secret);

    res.render('lti.ejs',{
        title: config.appName,
        formFields: formFields,
        action: action,
        method:method
    })
}