import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/appointments', appointmentsRouter);

export default routes;
