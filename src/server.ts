import errorHandler from 'errorhandler';
import app from './app';

/**
 * Error Handler. Provides full stack
 */
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env'),
  );
  // eslint-disable-next-line no-console
  console.log('  Press CTRL-C to stop\n');
});

export default server;
