import AppError from '@shared/error/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@fake.com',
      password: 'fakepassword',
    });

    const user_id = user.id;

    const profile = await showProfile.execute(user_id);

    expect(profile.name).toBe('Jhon Doe');
    expect(profile.email).toBe('jhondoe@fake.com');
  });

  it('should be not able to show the profile from a non-existing user.', async () => {
    const user_id = 'non-existing-id';

    await expect(showProfile.execute(user_id)).rejects.toBeInstanceOf(AppError);
  });
});
