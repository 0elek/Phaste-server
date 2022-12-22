import {randomBytes} from 'crypto';

export function generateId(): string {
  const buffer = randomBytes(3)
  return buffer.toString('hex').slice(0, 5)
}