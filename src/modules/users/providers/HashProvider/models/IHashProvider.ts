export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(password: string, hashed: string): Promise<boolean>;
}
