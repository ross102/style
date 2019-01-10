const faker = require('faker');
const Post = require('./models/post');

async function seedPosts() {
     await Post.remove({});
    //  for (const i of new Array(40) ) {
    //      const post = {
    //          title: faker.lorem.word(),
    //          description: faker.lorem.text(),
    //          author:  {
    //             '_id' : '5c302b8b181f0623fc8c9f84',
    //             'username' : 'ross101'
    //           }
    //      }
    //      await Post.create(post);
    //  }
     console.log(' posts removed ');
}
 
module.exports = seedPosts;