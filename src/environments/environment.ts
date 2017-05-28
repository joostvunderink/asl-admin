// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey           : 'AIzaSyDvoEoVPOWaYkr4QVVFJIdhcvyqiR9_3S0',
    authDomain       : 'asl-test-3fa76.firebaseapp.com',
    databaseURL      : 'https://asl-test-3fa76.firebaseio.com',
    projectId        : 'asl-test-3fa76',
    storageBucket    : 'asl-test-3fa76.appspot.com',
    messagingSenderId: '856333329536'
  }
};
