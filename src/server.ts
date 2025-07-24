import express from 'express'
import { PORT } from './utils/env'
import apiRoutes from './routes/api';

const app = express();

app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`)
});
