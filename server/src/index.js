import dotenv from 'dotenv'
import { app } from './app.js'
import { connectdb } from './db/db.js'
import { ApiError } from './utils/ApiError.js';

dotenv.config();

connectdb()
    .then(
        () => {
            const PORT = process.env.PORT || 3000;
            app.listen(PORT, () => {
                console.log(`Server listning on port : ${PORT}`);
            })
        }
    )
    .catch((error) => {
            throw new ApiError(500, 'Error connecting to database', error);
        }
    )