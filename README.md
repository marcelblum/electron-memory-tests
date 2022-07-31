# electron-memory-tests
compare process memory limits between different versions of electron

`npm install` will install electron@latest, electron@^13.6.9, and electron@^11.5.0

`npm run start-electron-latest` to test @latest

`npm run start-electron-13` to test with ^13.5.1

`npm run start-electron-11` to test with ^11.5

Repeatedly click the *fill render process RAM with 2GB via Buffer.alloc()* and/or *fill render process RAM with 2.7GB via decodeAudioData()* and/or *fill main process RAM with 2GB via Buffer.alloc()* buttons and see how high you can go in each Electron version. Have fun...

Re: https://github.com/electron/electron/issues/31330
