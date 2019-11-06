

const url = require('url');
const fs = require('fs');


module.exports = {
    //Allows the ability to load a header and foot file automagically
    handleRequest: (request, response) => {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        let page = url.parse(request.url).pathname;
        const trumpet = require('trumpet')
        const tr = trumpet()

        tr.pipe(response)

        const header = tr.select('.headerArea').createWriteStream()
        fs.createReadStream('./Layout/Header.html').pipe(header)

        const footer = tr.select('.footerArea').createWriteStream()
        fs.createReadStream('./Layout/Footer.html').pipe(footer)

        const body = tr.select('.bodyArea').createWriteStream();

        switch (page) {
            case "/":
                fs.createReadStream('./Index.html').pipe(body);
                break;
            case "/TestPage":
                fs.createReadStream('./Areas/TestPage.html').pipe(body);
                break;
            default:
                //TODO: Add Error Page Not found
                break;
        }

        fs.createReadStream('./BasePage.html').pipe(tr)
        
    }
}

