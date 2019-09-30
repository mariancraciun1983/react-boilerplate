export default function (mode) {
  if(mode === 'dev') {
    return function registerDev(app) {
      app.use('/api', require('./api').default);
      app.use(require('./static.dev').default);
      app.use(require('./app.dev').default);
      app.get('*', (req, res) => {
        res.send('You should have not hit this point!');
      });
    }
  }
  else  {
    return function registerDev(app) {
      app.use('/api', require('./api').default);
      app.use(require('./static.prod').default);
      app.get('*', (req, res) => {
        res.send('You should have not hit this point!');
      });
    }
  }
};


