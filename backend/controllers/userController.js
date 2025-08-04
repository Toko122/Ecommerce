const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer')
const crypto = require('crypto')


exports.RegisterUser = async (req, res) => {
    const {email, username, password} = req.body
    try{ 
      const existedUser = await User.findOne({
        $or: [{email}, {username}]
      })
      if(existedUser) return res.status(404).json('user already exist')
    
     const hashedPassword = await bcrypt.hash(password, 10)

     const user = await User.create({
        email, username, password:hashedPassword
     })
     res.status(200).json(user)
    }catch(err){
        res.status(500).json({message: 'Error register user', error:err.message})
    }
}

exports.LoginUser = async(req, res) => {
     const {username, password} = req.body
    try{

        const user = await User.findOne({username})
        if (!user) return res.status(404).json({ message: 'User does not exist' })

      const isMatched = await bcrypt.compare(password, user.password)
      if(!isMatched) return res.status(500).json('invalid username or password')

        const token = jwt.sign({id: user.id}, process.env.JWT, {expiresIn: "2d"})

        res.status(200).json({message: 'login succesfully', token, user })

    }catch(err){
        res.status(500).json({message: 'Error Login user', error:err.message})
    }
}

exports.sendEmail = async (req, res) => {
    const {email} = req.body
    try{

      const user = await User.findOne({ email })

      if(!user){
        return res.status(404).json({ message: 'User not found with this email' });
      }

      const resetToken = crypto.randomBytes(32).toString('hex')
      user.resetToken = resetToken
      user.resetTokenExpire = Date.now() + 1000 * 60 * 15
      await user.save()

      const resetLink = `http://localhost:5173/reset-password/${resetToken}`

      const transporter = await nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER,
          pass:  process.env.NODEMAILERCODE
        }
      })

      const mailOptions = {
        from: process.env.USER,
        to: email,
        subject: "🔐 Password Reset Request",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 24px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; background-color: #fff;">
      <h2 style="color: #333; text-align: center;">Reset Your Password</h2>

      <p style="font-size: 16px; color: #444;">
        Hello <strong>${email}</strong>,
      </p>

      <p style="font-size: 15px; color: #555;">
        We received a request to reset your password. If you made this request, please click the button below:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" 
           style="background-color: #4CAF50; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
          🔁 Reset Password
        </a>
      </div>

      <p style="font-size: 14px; color: #888;">
        If you didn’t request a password reset, you can safely ignore this email.
      </p>

      <p style="font-size: 14px; color: #aaa; text-align: center; margin-top: 40px;">
        &mdash; Your Security Team
      </p>
    </div>
        `
      }

      await transporter.sendMail(mailOptions)
      res.status(200).json({message: 'email sent'})
    }catch(err){
        res.status(500).json({message: 'cant send email', error: err.message})
    }
}

exports.resetPassword = async (req, res) => {
    const {password} = req.body
    const {token} = req.params
    try{

      const user = await User.findOne({
        resetToken: token,
        resetTokenExpire: {$gt: Date.now()}
      })

      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if(isMatch){
        return res.status(404).json({message: "password is same"})
      }
      
      const hashedPassword = await bcrypt.hash(password, 10)
      user.password = hashedPassword

      user.resetToken = undefined
      user.resetTokenExpire = undefined

      await user.save();

      res.status(200).json({message: 'password updated'})

    }catch(err){
      res.status(500).json({message: 'error reseting password', error: err.message})
    }
}