# electron-memory-tests
compare process memory limits between different versions of electron

`npm install` will install electron@latest, electron@nightly, electron@^11, and electron@^13 through ^18

`npm run start-electron-latest` to test @latest

`npm run start-electron-13` to test with ^13.x.y

`npm run start-electron-11` to test with ^11.x.y

etc.

Repeatedly click the *fill render process RAM with 2GB via Buffer.alloc()* and/or *fill render process RAM with 2.7GB via decodeAudioData()* and/or *fill main process RAM with 2GB via Buffer.alloc()* buttons and see how high you can go in each Electron version. Have fun...

Re: https://github.com/electron/electron/issues/31330

See also https://github.com/marcelblum/electron-windows-memory-unlimit
