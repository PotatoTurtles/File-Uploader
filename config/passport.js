const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
import { prisma } from ".../lib/prisma.js";
let bcrypt = require('bcrypt')

passport.use(new LocalStrategy(async (email,password,done)=>{
    try {
        email = email.trim();
        const user = await prisma.user.findUnique({
            where: {email}
        })
        
        console.log(user);
        if(user){
            if(await bcrypt.compare(password.trim(),user.password)){
                return done(null,rows[i])
            }
        }
        console.log("Incorrect Email: '"+email+"'");
        console.log("Incorrect Password: '"+password+"' ");

        return done(null,false,{message:"Username or Password is Wrong."});
    } catch (error) {
        return done(error)
    }
}));

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async (id,done)=>{
    try {
        const user = await prisma.user.findUnique({
            id:{id}
        })
        done(null,user);
    } catch (error) {
        done(error);
    }
})

module.exports=passport;