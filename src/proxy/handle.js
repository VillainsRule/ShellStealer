export default (app) => app.get(`/*`, async (req, res) => {
    let path = req.url.split('?')[0];

    if ([
        'models/Linear_Gradient_Texture.jpg'
    ].some(p => path.includes(p))) return res.status(404);

    let pathManagers = [
        [['shellshock.js'], 'script', true],

        [['.png', '.jpg', '.jpeg', '.svg', '.webm', '.ico', '.gif', '.lightmap'], 'buffer'],
        [['.js', '.json', '.css', '.babylon.manifest', '.babylon'], 'raw'],
        [['/'], 'raw', true]
    ];

    let file = pathManagers.find(s => s[0].some(p => path[s[2] ? 'endsWith' : 'includes'](p)))?.[1];
    if (!file) {
        console.log(`[ERROR] "${path}" was fetched, but there wasn't a ready handler.`);
        return res.status(404).send(`<html><head><title>404 Not Found</title></head><body><center><h1>404 Not Found</h1></center><hr><center>nginx/1.18.0</center></body></html>`);
    };

    await (await import(`#proxy/routes/${file}`)).default(req, res, path);
});