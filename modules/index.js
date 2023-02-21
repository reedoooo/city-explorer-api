const express = require('express');
const { promisify } = require('util');
const app = express();

const indexRouterPromise = import('./routes/index.js');
const asyncRequire = promisify(require);


async function main() {
  try {
    // Load any additional dependencies using asyncRequire
    const additionalDependency = await asyncRequire('additional-dependency');

    // Use the router after it has been loaded asynchronously
    const indexRouter = await indexRouterPromise;
    app.use('/', indexRouter);

    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
  } catch (error) {
    console.error(error);
  }
}

main();
