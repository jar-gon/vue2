import VConsole from 'vconsole';

if (process.env.VUE_APP_RUN_ENV !== 'prod') {
  // eslint-disable-next-line
  const vConsole = new VConsole();
}
