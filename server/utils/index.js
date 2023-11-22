import crypto from 'crypto'
import jsonwebtoken from 'jsonwebtoken'
import fs from 'fs'
import path from 'path';

const PRIVATE_KEY = fs.readFileSync(path.resolve() + '/id_private.pem')

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
    fs.writeFileSync(dirname + '/id_private.pem', keyPair.privateKey)
    fs.writeFileSync(dirname + '/id_public.pem', keyPair.publicKey)
}