var router = require('express').Router();
var passport = require('passport');
var mongoose = require('mongoose');
var Client = mongoose.model('Client');
var Session = mongoose.model('Session');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload client objects on routes with ':client'
router.param('client', function(req, res, next, slug) {
  Client.findOne({ slug: slug})
    .populate('author')
    .then(function (client) {
      if (!client) { return res.sendStatus(404); }

      req.client = client;

      return next();
    }).catch(next);
});

router.param('session', function(req, res, next, id) {
  Session.findById(id).then(function(session){
    if(!session) { return res.sendStatus(404); }

    req.session = session;

    return next();
  }).catch(next);
});

router.get('/', auth.required, function(req, res, next) {
  var query = {};
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    query.author = user._id;
    return Promise.all([
      Client.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'})
        .populate('author')
        .exec(),
      Client.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function(results){
      var clients = results[0];
      var clientsCount = results[1];
      var user = results[2];

      return res.json({
        clients: clients.map(function(client){
          return client.toJSONFor(user);
        }),
        clientsCount: clientsCount
      });
    });
  }).catch(next);
});

router.post('/', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    var client = new Client(req.body.client);
    client.birthday = new Date(req.body.client.birthday);
    client.author = user;

    return client.save().then(function(){
      return res.json({client: client.toJSONFor(user)});
    });
  }).catch(next);
});

// return a client
router.get('/:client', auth.optional, function(req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.client.populate('author').execPopulate()
  ]).then(function(results){
    var user = results[0];

    return res.json({client: req.client.toJSONFor(user)});
  }).catch(next);
});

// update client
router.put('/:client', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(req.client.author._id.toString() === req.payload.id.toString()){
      if(typeof req.body.client.firstName !== 'undefined'){
        req.client.firstName = req.body.client.firstName;
      }

      if(typeof req.body.client.lastName !== 'undefined'){
        req.client.lastName = req.body.client.lastName;
      }

      if(typeof req.body.client.birthday !== 'undefined'){
        req.client.birthday = req.body.client.birthday;
      }

      if(typeof req.body.client.telephone !== 'undefined'){
        req.client.telephone = req.body.client.telephone
      }

      if(typeof req.body.client.street !== 'undefined'){
        req.client.street = req.body.client.street
      }

      if(typeof req.body.client.city !== 'undefined'){
        req.client.city = req.body.client.city
      }

      if(typeof req.body.client.postalCode !== 'undefined'){
        req.client.postalCode = req.body.client.postalCode
      }

      req.client.save().then(function(client){
        return res.json({client: client.toJSONFor(user)});
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

// delete client
router.delete('/:client', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    if(req.client.author._id.toString() === req.payload.id.toString()){
      return req.client.remove().then(function(){
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});


// return an client's sessions
router.get('/:client/sessions', auth.optional, function(req, res, next){
  Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function(user){
    return req.client.populate({
      path: 'sessions',
      options: {
        sort: {
          createdAt: 'desc'
        }
      }
    }).execPopulate().then(function(client) {
      const respons = res.json({sessions: req.client.sessions.map(function(session){
        return session.toJSONFor(user, client);
      })});
      return respons;
    });
  }).catch(next);
});

// create a new session
router.post('/:client/sessions', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }
    var session = new Session(req.body.session.body);
    session.client = req.client;
    session.author = user;
    session.isCanceled = false;
    return session.save().then(function(){
      Client.findById(req.client.id).then(function(client){
        client.sessions.push(session);
        return client.save().then(function(client){
          res.json({session: session.toJSONFor(user)});
        })
      })
    });
  }).catch(next);
});

router.delete('/:client/sessions/:session', auth.required, function(req, res, next) {
  if(req.session.author.toString() === req.payload.id.toString()){
    req.client.sessions.remove(req.session._id);
    return req.client.save()
      .then(Session.find({_id: req.session._id}).remove().exec())
      .then(function(){
        res.sendStatus(204);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
