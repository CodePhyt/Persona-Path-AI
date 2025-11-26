const http = require('http');

const data = JSON.stringify({
    context: {
        age: 25,
        job: "Software Engineer",
        location: "New York",
        economy: "Stable",
        goal: "Start a business"
    },
    answers: {
        "1": 4, "2": 3, "3": 5, "4": 2, "5": 4
    }
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/analyze',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log('BODY:', body);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
