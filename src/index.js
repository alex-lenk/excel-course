import './module';
import './scss/index.scss'

console.log('Working!');

async function start() {
  return await Promise.resolve('asinc working s !')
}

start().then(console.log);
