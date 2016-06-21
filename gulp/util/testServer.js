import express from 'express';

export default function testServer({port, dir}) {

  const app = express();

  app.use(express.static(dir));

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      resolve(server);
    });
  });

}
