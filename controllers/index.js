const passport = require('passport');
const request = require('request-promise')
const Post = require('../models/post')
const User = require('../models/user');

module.exports = {
		// Get Register
		getRegister(req, res, next) {
			res.render('register', { title: 'sign up', username: '', email: '' });
		},

	// POST /register
	async postRegister(req, res, next) {
		
	try  {
		//Check if isAdmin
		if(req.body.isAdmin === 'style36#') {
			newUser.isAdmin = true;
	    } else {
			newUser.isAdmin = false;
	    }
		const user = await User.register(new User(req.body), req.body.password);
		req.login(user, function(err) {
			if (err) return next(err);
			req.session.success = `Welcome to Styleswag, ${user.username}!`;
			res.redirect('/');
		});
	} catch(err) {
		const { username, email } = req.body;
		let error = err.message;
		if (error.includes('duplicate') && error.includes('index: email_1 dup key')) {
			error = 'A user with the given email is already registered';
		}
		res.render('register', { title: 'Register', username, email, error })
	}
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
				q: req.query.foodSearch
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