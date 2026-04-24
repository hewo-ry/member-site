# Member site

Kopioi oletus ympäristömuuttujat:

```bash
cp .env.sample .env
```

Aseta tämän jälkeen puuttuvat tiedot.

`ORG_THEME` on build-aikainen asetus (`hewo` tai `pmty`).
Teeman vaihtaminen vaatii uuden buildin, ja devaustilassa vähintään `yarn dev` -prosessin uudelleenkäynnistyksen.

Devaus:

```bash
yarn dev
```
