import crypto from 'crypto'
import jsonwebtoken from 'jsonwebtoken'
import fs from 'fs'
import path from 'path';
import dotenv from 'dotenv'

dotenv.config()

const PRIVATE_KEY = process.env.PRIVATE_KEY

export function isPasswordValid(password, hash, salt) {
    const hashAttempt = crypto
        .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');
  return hashAttempt === hash;
}

export function generatePassword(password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto
        .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');

    return {
        salt,
        hash
    }
}

export function issueJWT(user) {
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

export function issueForgotPasswordJWT(email) {
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

export function generateKeyPair() {
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

export function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomCode = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomCode += characters.charAt(randomIndex);
    }
  
    return randomCode;
}