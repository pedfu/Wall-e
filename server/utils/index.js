const crypto = require ('crypto')
const jsonwebtoken = require ('jsonwebtoken')
const fs = require ('fs')
const path = require ('path')
const dotenv = require ('dotenv')

dotenv.config()

const PRIVATE_KEY = process.env.PRIVATE_KEY

function isPasswordValid(password, hash, salt) {
    const hashAttempt = crypto
        .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');
  return hashAttempt === hash;
}

function generatePassword(password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto
        .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');

    return {
        salt,
        hash
    }
}

function issueJWT(user) {
    const expiresIn = '14d'
    const payload = {
        sub: user._id,
        iat: Date.now()
    }

    const signedToken = jsonwebtoken.sign(payload, PRIVATE_KEY, { expiresIn: expiresIn, algorithm: 'RS256' })

    return {
        token: `Bearer ${signedToken}`,
        expiresIn: expiresIn
    }
}

function issueForgotPasswordJWT(email) {
    const expiresIn = '10m'
    const payload = {
        sub: email,
        iat: Date.now()
    }

    const emailToken = jsonwebtoken.sign(payload, PRIVATE_KEY, { expiresIn: expiresIn, algorithm: 'RS256' })

    return {
        token: `Bearer ${emailToken}`,
        expiresIn: expiresIn
    }
}

function generateKeyPair() {
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    })

    const dirname = path.resolve()
    // fs.writeFileSync(dirname + '/id_private.pem', keyPair.privateKey)
    // fs.writeFileSync(dirname + process.env.PUBLIC_KEY)
}

function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomCode = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomCode += characters.charAt(randomIndex);
    }
  
    return randomCode;
}

module.exports = {
    generateRandomCode,
    generateKeyPair,
    issueForgotPasswordJWT,
    issueJWT,
    generatePassword,
    isPasswordValid,
}