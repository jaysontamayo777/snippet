const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const getenv = require('getenv');
const path = require('path');
const basicAuth = require('express-basic-auth');
const cookieParser = require('cookie-parser');

const port = getenv('PORT', 3000);
const env = getenv('NODE_ENV', 'production');
const app = express();

app.use(helmet());
app.use(compression());
app.use(cookieParser());

if (process.env.PASSWORD_PROTECTED) {
  app.use(basicAuth({
    users: { axags: 'digitalfactory' },
    challenge: true
  }));
}

app.use(require('express-package-version')({
  url    : '/versions',
  format : 'serving @ %s'
}));

if (process.env.PUBLIC_URL) {
  console.log(`You can access - domain-name${process.env.PUBLIC_URL}`);
  app.use(process.env.PUBLIC_URL, express.static(path.join(__dirname, `build-${env}`)));
  app.use(`${process.env.PUBLIC_URL}/payment-confirmation`, express.static(path.join(__dirname, `build-${env}`)));
} else {
  app.use(express.static(path.join(__dirname, `build-${env}`)));
  app.use('/payment-confirmation', express.static(path.join(__dirname, `build-${env}`)));
}

app.get('*', (req, res) => {
  res.sendFile(`${path.join(__dirname, `build-${env}`)}/index.html`);
});

app.listen(port, console.log(`Started server for '${env}' environment at port ${port}`));
