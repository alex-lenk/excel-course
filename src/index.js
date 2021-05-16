import './scss/index.scss'

async function start() {
  return await Promise.resolve('asinc workingqweqwe!')
}

start().then(console.log);
