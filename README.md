# JS-Multiplayer-Game

## Om Projektet

Ett spel i webbläsaren med obegränsat antal spelare.<br>
Hela spelet går ut på att döda varandra. <br>

JS-Multiplayer-Game är vårat gymnasiearbete 2020/2021.<br>
Det är Linus Romland, Anton Helenius och Markus Simonsen från NTI Kronhus Göteborg. 

### Byggt med

JS-Multiplayer-Game använder följande bilbiotek och språk för att göra spelet:

* [NodeJS](https://nodejs.org/en/)
* [TypeScript](https://www.typescriptlang.org/)
* [HTML](https://www.w3.org/html/)
* [CSS](https://www.w3.org/Style/CSS/Overview.en.html)

## Testa själv

### Live

JS-Multiplayer-Game finns live att pröva på följande länk [game.cloudremover.com](https://game.cloudremover.com/)

### Bygg programmet själv
För att bygga programmet själv behöver du ha [NodeJS](https://nodejs.org/en/) installerat.<br>
Du behöver även ha [TypeScript](https://www.npmjs.com/package/typescript) installerat via npm globalt.
<br>
Konfigurera din servers Secure Websocket nycklar
```
cp ./Server/serverConfig.json.example ./Server/serverConfig.json
nano ./Server/serverConfig.json
```

Bygg clientens typescript
```
tsc -p ./Client
```

Starta servern vilket automatiskt bygger allting för servern
```
cd ../Server
npm i
npm run dev
```
## License

JS-Multiplayer-Game är under MIT License. Se `LICENSE` för mer information.


