const Review = require('../models/review');
const User = require('../models/user')
module.exports = {
	asyncErrorHandler: (fn) =>
		(req, res, next) => {
			Promise.resolve(fn(req, res, next))
						 .catch(next);
		},
	isReviewAuthor: async (req, res, next) => {
	  let review = await Review.findById(req.params.review_id)
	  if(review.author.equals(req.user._id)) {
		  return next();
	  } 
	   req.session.error = "Bye bye";
	   return res.redirect('/')
	},
	checkIfUserExists: async(req, res, next) => {
		let userExists = User.findOne({'email': req.body.email })
		if(userExists.length > 0 ) {
			req.session.error = 'A user with the given email is already registered';
			return res.redirect("back");
		} else {
			next();
		}
		
	},
	isLoggedIn: (req, res, next) => {
		if(req.isAuthenticated()) return next();
		req.session.error = 'You need to be logged in to do that!';
		req.session.redirectTo = req.originalUrl;
		res.redirect('/login');
	}
}