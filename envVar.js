module.exports = () => {
    const fs = require('fs');

    const contents = fs.readFileSync('.env', 'utf8');
    const lines = contents.split('\n');

    for (const line of lines) {
        const [key, value] = line.split('=');
        process.env[key] = value;
    }

}