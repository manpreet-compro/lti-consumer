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
    let {lti_message_type, lti_version, resource_link_id, oauth_consumer_key, oauth_signature_method, oauth_version} = req.query; //Shoould filter later
    let formFields = {lti_message_type, lti_version, resource_link_id, oauth_consumer_key, oauth_signature_method, oauth_version};

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