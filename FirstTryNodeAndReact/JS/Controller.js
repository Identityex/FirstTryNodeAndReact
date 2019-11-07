
module.exports = {
    //Allows the ability to load a header and foot file automagically
    handleRequest: (request, response) => {
        const url = require('url');
        const fs = require('fs');

        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        let page = url.parse(request.url).pathname;
        const trumpet = require('trumpet');
        const tr = trumpet();

        tr.pipe(response);

        const header = tr.select('.headerArea').createWriteStream();
        fs.createReadStream('./Layout/Header.html').pipe(header);

        const footer = tr.select('.footerArea').createWriteStream();
        fs.createReadStream('./Layout/Footer.html').pipe(footer);


        //TODO: Look into a better way to host static files
        const css = tr.select('.cssArea').createWriteStream();
        fs.createReadStream('./CSS/cover.css').pipe(css);

        const body = tr.select('.bodyArea').createWriteStream();

        //Body Pages
        switch (page) {
            case "/":
                fs.createReadStream('./Index.html').pipe(body);
                break;
            case "/TestPage":
                fs.createReadStream('./Areas/TestPage.html').pipe(body);
                break;
            case "/CodeTests":
                fs.createReadStream('./Areas/CodeTests.html').pipe(body);
                break;
            default:
                //TODO: Add Error Page Not found
                break;
        }

        //Main Page
        fs.createReadStream('./Layout/BasePage.html').pipe(tr);
    }
}

