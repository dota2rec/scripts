const https = require('https');
const request = require('request');
const fs = require('fs');
const jsdom = require("jsdom");

request('https://www.dota2.com/heroes/', (err, res, body) => {
    const dom = new jsdom.JSDOM(body);
    const images = dom.window.document.querySelectorAll("img");
    const names = [];

    for (const image of images) {
        // https://steamcdn-a.akamaihd.net/apps/dota2/images/items/bfury_lg.png
        const matches = image.src.match(/https:\/\/steamcdn-a.akamaihd.net\/apps\/dota2\/images\/heroes\/(.*?)_sb.png/);

        if (matches && matches[1]) {
            const name = matches[1];
            names.push(name)

            https.get(image.src.replace('_sb.png', '_lg.png'), res => {
                const file = fs.createWriteStream(`./images/${name}.png`);
                res.pipe(file)
            });
        }
    }

    console.log(names.length)
});

// request('https://www.dota2.com/items/', (err, res, body) => {
//     const dom = new jsdom.JSDOM(body);
//     const images = dom.window.document.querySelectorAll("img");
//     const names = [];

//     for (const image of images) {
//         // https://steamcdn-a.akamaihd.net/apps/dota2/images/items/bfury_lg.png
//         const matches = image.src.match(/https:\/\/steamcdn-a.akamaihd.net\/apps\/dota2\/images\/items\/(.*?)_lg.png/);



//         if (matches && matches[1]) {
//             const name = matches[1];
//             names.push(name)

//             https.get(image.src, res => {
//                 const file = fs.createWriteStream(`./images/${name}.png`);
//                 res.pipe(file)
//             });
//         }
//     }

//     console.log(names.length)
// });