import axios from 'axios';

export default async (req, res, path) => {
    try {
        let request = await axios.get(`https://math.international/${path}`, {
            responseType: 'arraybuffer'
        });

        const imageBuffer = Buffer.from(request.data, 'binary');

        res.header('Content-Type', request.headers['content-type']);
        res.send(imageBuffer);
    } catch (e) {
        console.error(e, path);
    };
};