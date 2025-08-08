const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const client = new OAuth2Client(process.env.CLIENTID)

exports.googleLogin = async (req,res) => {
    const {token} = req.body

    if (!token) return res.status(400).json({ message: 'Token is required' });

    try{
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENTID
      })

      const payload = ticket.getPayload()
      const {sub: googleId, username, email} = payload

      let user = await User.findOne({email})

      if(!user){
        user = await User.create({
          googleId, username, email
        })
      } else if(!user.googleId){
        user.googleId = googleId
        user.username = user.username || username
        await user.save()
      }

      const appToken = jwt.sign({id: user._id, email: user.email}, process.env.JWT, {expiresIn: '2d'})

      res.json({ token: appToken, user });
    }catch(err){
    console.error('Google auth error:', err);
    return res.status(401).json({ message: 'Invalid Google token' });
    }
}