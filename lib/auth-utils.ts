import crypto from "crypto"

// Generate a random salt
export function generateSalt(length = 16): string {
  return crypto.randomBytes(length).toString("hex")
}

// Hash a password with a salt
export function hashPassword(password: string, salt: string): string {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")
  return hash
}

// Verify a password against a hash and salt
export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const candidateHash = hashPassword(password, salt)
  return candidateHash === hash
}
