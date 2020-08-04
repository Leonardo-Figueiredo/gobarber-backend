import AppError from '@shared/error/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate user.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@doe.com',
      password: 'jhony123123',
    });

    const response = await authenticateUserService.execute({
      email: 'jhondoe@doe.com',
      password: 'jhony123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toBe(user);
  });

  it('should be not able to authenticate with wrong email or pasword', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@doe.com',
      password: 'jhony123123',
    });

    expect(
      authenticateUserService.execute({
        email: 'jhonydoe@doe.com',
        password: 'jhony123123',
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(
      authenticateUserService.execute({
        email: 'jhondoe@doe.com',
        password: 'jhony123122',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
