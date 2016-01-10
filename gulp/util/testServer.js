'use strict';

import express from 'express';

export default function testServer({port, dir}) {

  const app = express();

  app.use(express.static(dir));

  return new Promise((res, rej) => {
    const server = app.listen(port, () => res(server));
  });

}
