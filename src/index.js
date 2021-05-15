import './module';
import './scss/index.scss'

console.log('Working!');

async function start() {
  return await Promise.resolve('asinc working!')
}

start().then(console.log);
