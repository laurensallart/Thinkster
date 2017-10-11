var router = require('express').Router();
var passport = require('passport');
var mongoose = require('mongoose');
var Session = mongoose.model('Session');
var User = mongoose.model('User');
var Client = mongoose.model('Client');
var auth = require('../auth');

router.param('session', function(req, res, next, id) {
  Session.findById(id).then(function(session){
    if(!session) { return res.sendStatus(404); }

    req.session = session;
    return next();
  }).catch(next);
});

router.get('/', auth.required, function(req, res, next) {
  var query = {};
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    query.author = user._id;
    return Promise.all([
      Session.find(query)
        .sort({date: 'desc'})
        .populate('author')
        .populate('client')
        .exec(),
      Session.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function(results){
      var sessions = results[0];
      var sessionsCount = results[1];
      var user = results[2];
      return res.json({
        sessions: sessions.map(function(session){
          return session.toJSONFor(user);
        }),
        sessionsCount: sessionsCount
      });
    });
  }).catch(next);
});

router.get('/:date', auth.required, function(req, res, next) {
  var query = {};
  console.log(req.params.date);

  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    query.author = user._id;
    query.date = {"$gte": new Date(), "$lt": new Date(2017, 12, 31)}
    return Promise.all([
      Session.find(query)
        .sort({date: 'desc'})
        .populate('author')
        .populate('client')
        .exec(),
      Session.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function(results){
      var sessions = results[0];
      var sessionsCount = results[1];
      var user = results[2];
      return res.json({
        sessions: sessions.map(function(session){
          return session.toJSONFor(user);
        }),
        sessionsCount: sessionsCount
      });
    });
  }).catch(next);
});

router.get('/:date/:numberOfDays', auth.required, function(req, res, next) {
  var query = {};
  beginDate = new Date(req.params.date);
  endDate = new Date(req.params.date);
  endDate.setDate(endDate.getDate() + req.params.numberOfDays);
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }
    query.author = user._id;
    query.date = {"$gte": beginDate, "$lt": endDate}
    return Promise.all([
      Session.find(query)
        .sort({date: 'desc'})
        .populate('author')
        .populate('client')
        .exec(),
      Session.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function(results){
      var sessions = results[0];
      var sessionsCount = results[1];
      var user = results[2];
      return res.json({
        sessions: sessions.map(function(session){
          return session.toJSONFor(user);
        }),
        sessionsCount: sessionsCount
      });
    });
  }).catch(next);
});

router.delete('/:session', auth.required, function(req, res, next) {
  if(req.session.author.toString() === req.payload.id.toString()){
    Client.findById(req.session.client).then(function(client) {
      client.sessions.remove(req.session._id);
      client.save()
        .then(Session.remove({_id: req.session._id}, function(err, session) {
          if (err) 
            res.send(err);
          res.json({ message: 'succesfully deleted'});
        }))
    }).catch(next);;
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;