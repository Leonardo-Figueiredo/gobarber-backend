import AppError from '@shared/error/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let appointmentRepository: FakeAppointmentRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    appointmentRepository = new FakeAppointmentRepository();
    createAppointmentService = new CreateAppointmentService(
      appointmentRepository,
    );
  });

  it('should be able to create a new appointment.', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 1, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '123123123',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
