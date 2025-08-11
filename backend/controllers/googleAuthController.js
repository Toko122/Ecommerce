const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');

const Client = new OAuth2Client(process.env.CLIENTID)

exports.googleAuth = async (req, res) => {
  const { token } = req.body

  if (!token) return res.status(400).json({ message: 'Token is required' });

  try{
    const client = await Client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
    })
    
    const payload = client.getPayload()
    const {sub: googleId, username, email} = payload

    let user = await User.findOne({email})

    if(!user){
      user = await User.create({
          googleId, email, username
      })
      await user.save()
    }else if(!user.googleId){
        user.googleId = googleId
        user.username = user.username || username
        await user.save()
    }

    const appToken = jwt.sign({id: user._id, email: user.email}, process.env.JWT, {expiresIn: '1d'})

    res.status(200).json({user, token: appToken})

  }catch(err){
      res.status(500).json({message: 'error login with google', error: err.message})
  }
}
