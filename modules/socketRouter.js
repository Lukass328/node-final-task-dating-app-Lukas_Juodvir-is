/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable max-len */

const FormSchema = require('../schemas/registerSchema');
const LikesSchema = require('../schemas/likesSchema');
const DislikesSchema = require('../schemas/dislikesSchema');





module.exports = (io) => {
  io.on('connect', async (socket) => {
    const users = await FormSchema.find();
    socket.emit('allusers', users)


    socket.on("user", async (data) => {



      console.log('users ===', users);


    })
    socket.on("userfilter", async (data) => {
      console.log('data ===', data);
      const { username, city, gender, maxAge, minAge } = data

      const users = await FormSchema.find({
        username: { $nin: username },
        age: { $gte: minAge, $lte: maxAge },
        city: city,
        gender: gender
      });
      // console.log('user ===', users);


      socket.broadcast.emit('filteredUsers', users)

    })

    socket.on("likedUser", async (data) => {
      console.log('data ===', data);
      const { iLikedId, myId, photos, name } = data




    })
    socket.on("dislikedUser", async (data) => {
      console.log('data ===', data);
      const { myId, dislike } = data




      const dislikes = await DislikesSchema.insertMany({ userId: myId, dislikesUserId: dislike })
      console.log('updatedArr ===', dislikes);





    })




  });
};
