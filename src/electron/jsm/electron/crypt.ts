import { safeStorage } from 'electron'

const encoding = 'base64'

function encryptString (plainText: string) {
  return safeStorage.encryptString(plainText).toString(encoding)
}

function decryptString (plainText: string) {
  return safeStorage.decryptString(Buffer.from(plainText, encoding))
}

export { encryptString, decryptString }
