import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
    {
        fullName:{
            type: String,
            required: true
        },
        phoneNumber:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        isAdmin:{
            type: Boolean,
            default: false
        }
    }
    ,{timestamps:true})

    
    userSchema.pre('save', async function(next){
        if(!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 10)
        next()
    })
    
    userSchema.methods.isCorrectPassword = async function(password){
        return await bcrypt.compare(password, this.password)
    }

    userSchema.methods.generateAccessToken = function(){
        return jwt.sign(
            {
                _id: this._id,
                isAdmin: this.isAdmin
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
                // expiresIn:"1m"
            }
        )
    }
    export const User = mongoose.model('User', userSchema)