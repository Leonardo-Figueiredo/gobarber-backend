import AppError from '@shared/error/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user.', async () => {
    const user = await createUserService.execute({
      name: 'Leonardo Rodrigues Figueiredo',
      email: 'leo@123.com.br',
      password: 'abc123abc',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Leonardo Rodrigues Figueiredo');
  });

  it('should be not able to create two users with the same email address.', async () => {
    await createUserService.execute({
      name: 'Leonardo Rodrigues Figueiredo',
      email: 'leo@123.com.br',
      password: 'abc123abc',
    });

    await expect(
      createUserService.execute({
        name: 'Leonardo Rodrigues Figueiredo',
        email: 'leo@123.com.br',
        password: 'abc123abc',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
