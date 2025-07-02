const query = Object.fromEntries(document.location.search.slice(1).split('&').map(el => el.split('=')));
const app = new App();
app.init(query.line, query.track, query.n, query.import);
