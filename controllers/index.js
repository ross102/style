const passport = require('passport');
const request = require('request-promise')
const Post = require('../models/post')
const User = require('../models/user');

module.exports = {
		// Get Register
		getRegister(req, res, next) {
			res.render('register');
		},

	// POST /register
	async postRegister(req, res, next) {
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			image: req.body.image,
			isAdmin: req.body.isAdmin
		});
		//Check if isAdmin
		if(req.body.isAdmin === 'style36#') {
			newUser.isAdmin = true;
	} else {
			newUser.isAdmin = false;
	}
		let user = await User.register(newUser, req.body.password);
		req.login(user, function(err) {
			if(err) {
				return next(err)
			} else {
			req.session.success = "successfully registered! welcome " + user.username + '!' ;
			res.redirect("/");
			}
		})
		
	},
		// GET login 
		getLogin(req, res, next) {
			res.render('login');
		},
	 
	// POST /login
	async postLogin(req, res, next) {
		const { username, password } = req.body;
	const { user, error } = await User.authenticate()(username, password);
	if(!user && error) {
		return next(error);
	}
	req.login(user, function(err) {
		if (err) return next(err);
		req.session.success = `Welcome back, ${username}!`;
		const redirectUrl = req.session.redirectTo || '/';
		delete req.session.redirectTo;
		res.redirect(redirectUrl);
	});

			},

	//  GET recipes 
	async getRecipe(req, res, next) {
		let options;
		 options = {
			uri: "http://food2fork.com/api/search",
			method: "GET",
			qs: {
				key: process.env.API_KEY,
				q: "pizza"
			},
			json: true
		}
		const data = await request(options);
          res.render("recipes", { data });	 
	},
	   
	  async showRecipe(req, res, next) {   
			let options;
		options = {
		   uri: "https://food2fork.com/api/get",
		   method: "GET",
		   qs: {
			   key: process.env.API_KEY,
			   rId: req.params.recipe_id
		   },
		   json: true
	   }
	   const data = await request(options);
			 res.render("show", { data });
			 
	  },

        async getProfile(req, res, next) {
	    const user =  await User.findById(req.params.id);
	    const  posts  = await Post.find().where('author.id').equals(user._id).exec();
	      
			res.render("users/show", { user , posts})  
	      
		},
	// GET /logout
	getLogout(req, res, next) {
		req.logout();
		req.session.error = "logged you out"
	  res.redirect('/');
	}
}