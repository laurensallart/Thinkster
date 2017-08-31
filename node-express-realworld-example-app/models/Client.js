var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var CLientSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  firstName: String,
  lastName: String,
  birthday: String,
  telephone: String,
  street: String,
  city: String,
  postalCode: Number,
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

CLientSchema.plugin(uniqueValidator, {message: 'is already taken'});

CLientSchema.pre('validate', function(next){
  this.slugify();

  next();
});

CLientSchema.methods.slugify = function() {
  this.slug = slug(this.firstName + this.lastName);
};

CLientSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    firstName: this.firstName,
    lastName: this.lastName,
    birthday: this.birthday,
    telephone: this.telephone,
    street: this.street,
    city: this.city,
    postalCode: this.postalCode,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    author: this.author.toProfileJSONFor(user)
  };
};

mongoose.model('Client', CLientSchema);
