import jwt, { Secret } from "jsonwebtoken";

interface IPayload {
    email?: string,
    role?: string
}

export function generateToken(payload: IPayload, secret: Secret, expiresIn: string) {
    return jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn })
}