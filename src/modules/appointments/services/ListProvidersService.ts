import { injectable, inject } from 'tsyringe';

import AppError from '@shared/error/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  except_user_id?: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data?: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id: data?.except_user_id,
    });

    if (!users) throw new AppError('User not found.');

    return users;
  }
}

export default ListProvidersService;
