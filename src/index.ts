import Core from './core/main';
import { version, name } from '../package.json';

export default {
  BUILD_ENV: process.env.BUILD_ENV,
  version: version,
  name: name,
  core: new Core()
}