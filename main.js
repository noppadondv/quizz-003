const axios = require('axios')
const HTMLParser = require('node-html-parser');
const input = process.argv.slice(2)

if (input.length) {
    axios.get("http://codequiz.azurewebsites.net/", {
        headers: {
            Cookie: 'hasCookie=true;'
        }
    })
        .then(res => {
            const html = HTMLParser.parse(res.data)
            const rows = html.querySelectorAll("table tr")
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                for (let j = 0; j < row.childNodes.length; j++) {
                    if (row.childNodes[j].textContent.trim() == input[0]) {
                        console.log(row.childNodes[j + 1].textContent)
                    }
                }
            }
        })
} else {
    console.log("Please input name");
}