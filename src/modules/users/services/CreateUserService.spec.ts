import AppError from '@shared/error/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'Leonardo Rodrigues Figueiredo',
      email: 'leo@123.com.br',
      password: 'abc123abc',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Leonardo Rodrigues Figueiredo');
  });

  it('should be not able to create two users with the same email address.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'Leonardo Rodrigues Figueiredo',
      email: 'leo@123.com.br',
      password: 'abc123abc',
    });

    expect(
      createUserService.execute({
        name: 'Leonardo Rodrigues Figueiredo',
        email: 'leo@123.com.br',
        password: 'abc123abc',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
