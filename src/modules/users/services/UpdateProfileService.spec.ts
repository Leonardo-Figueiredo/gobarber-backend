import AppError from '@shared/error/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@fake.com',
      password: 'fakepassword',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Fakes',
      email: 'jhonfakes@fake.com',
    });

    expect(updatedUser.name).toBe('Jhon Fakes');
    expect(updatedUser.email).toBe('jhonfakes@fake.com');
  });

  it('should be not able to update the profile from a non-existing user.', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-id',
        name: 'non-existing-name',
        email: 'mail@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email.', async () => {
    await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@fake.com',
      password: 'fakepassword',
    });

    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe Foo',
      email: 'jhondoefoo@fake.com',
      password: 'fakepassword',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Fakes',
        email: 'jhondoe@fake.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@fake.com',
      password: 'fakepassword',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Fakes',
      email: 'jhonfakes@fake.com',
      old_password: 'fakepassword',
      password: 'fakep@ss',
    });

    expect(updatedUser.password).toBe('fakep@ss');
  });

  it('should be not able to update the password without old password.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@fake.com',
      password: 'fakepassword',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Fakes',
        email: 'jhonfakes@fake.com',
        password: 'fakep@ss',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able to update the password with wrong old password.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@fake.com',
      password: 'fakepassword',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Fakes',
        email: 'jhonfakes@fake.com',
        old_password: 'wrong-password',
        password: 'fakep@ss',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
