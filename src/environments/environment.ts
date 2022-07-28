// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  server_URL: "http://localhost:8080",
  client_URL: "http://localhost:4200",
  API_URL: window['__env' as any]['API_URL' as any],
  firebaseConfig : {
    apiKey: "AIzaSyBBL8Vu5DR-0qgt68yDW9ebx7frxfSgIvg",
    authDomain: "clean-service-8b1d9.firebaseapp.com",
    projectId: "clean-service-8b1d9",
    storageBucket: "clean-service-8b1d9.appspot.com",
    messagingSenderId: "574162432271",
    appId: "1:574162432271:web:2a9c3d0a9954592e790e7a",
    measurementId: "G-YXL16Z15Y7"
  }
};

 
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
