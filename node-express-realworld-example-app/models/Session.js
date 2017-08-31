var mongoose = require('mongoose');
var User = mongoose.model('User');

var SessionSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  durationInMinutes: Number,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' }
}, {timestamps: true});

// Requires population of author
SessionSchema.methods.toJSONFor = function(user, client){
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    date: this.date,
    durationInMinutes: this.durationInMinutes,
    createdAt: this.createdAt,
    author: this.author,
    client: this.client
  };
};

mongoose.model('Session', SessionSchema);
