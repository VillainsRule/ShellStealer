import express from 'express';
import config from '#config';

import apiHandler from '#api/handle';
import proxyHandler from '#proxy/handle';

(async () => {
    const app = express();
   
    app.use(express.json());

    await apiHandler(app);
    await proxyHandler(app);

    app.listen(config.port, () => console.log(`ShellStealer is running @ http://localhost:${config.port}`));
})();