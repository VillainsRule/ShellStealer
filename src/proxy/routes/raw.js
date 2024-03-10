import axios from 'axios';

export default async (req, res, path) => {
    try {
        let request = await axios.get(`https://math.international/${path}`);

        res.header('Content-Type', request.headers['content-type']);
        res.send(request.data);
    } catch (e) {
        console.error(e, path);
    };
};