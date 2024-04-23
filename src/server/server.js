
import * as http from "http";
import * as url from "url";
import buildings from './mockdata.js';


const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const options = parsedUrl.query;

    // Set CORS headers for cross-origin allowance
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Content-Type', 'application/json');

    const isMatch = (method, path) => 
        req.method === method && req.url.startsWith(path);

    if (isMatch('GET', '/getBuilding')) {
        const searchQuery = options.name ? options.name.toLowerCase() : '';
        const filteredBuildings = buildings.filter(building =>
            building.name.toLowerCase().includes(searchQuery)
        );
        res.writeHead(200);
        res.end(JSON.stringify(filteredBuildings));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

const PORT = 3260;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});