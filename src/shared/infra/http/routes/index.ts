import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/providers', providersRouter);
routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/password', passwordRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
