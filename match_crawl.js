if (process.argv.length !== 3) {
	console.log('Use: node match_crawl.js <STARTING_INDEX>');
	process.exit(1);
}

const baseIdx = parseInt(process.argv[2]);

const fs = require('fs');
const request = require('request');

const startFrom = baseIdx;

let index = startFrom;

if (!fs.existsSync('data')) {
	fs.mkdirSync('data');
}
if (!fs.existsSync('data/without_purchase_log')) {
	fs.mkdirSync('data/without_purchase_log');
}

function makeRequest() {
	const currIndex = index;
	request(`https://api.opendota.com/api/matches/${currIndex}`, (err, res, body) => {
		if (res && res.statusCode === 200) {
			const matchData = JSON.parse(body);
			if (matchData.players[0].purchase_log) {
				console.log('with purchase log', currIndex);
				fs.writeFileSync(`data/${currIndex}.json`, body);
			} else {
				console.log('no purchase log', currIndex);
				fs.writeFileSync(`data/without_purchase_log/${currIndex}.json`, body);
			}
		}
	});

	index++;

	setTimeout(makeRequest, 500);
}

makeRequest();