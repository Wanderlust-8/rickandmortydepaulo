const getMain = async (req, res) => {
    const htmResponse = `
            <html>
                <head>
                    <title>Backend corriendo</title>
                </head>
                <body>
                    <h1>Corriendo</h1>
                </body>
            </html>`;
    res.send(htmResponse);
};
module.exports = getMain;
