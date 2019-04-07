// Careful that the first element
// in the table is considered the
// default instrument.
const instruments = [
  {
    name: 'Inconnu',
    code: 'inco'
  },
  {
    name: 'Bière',
    code: 'beer'
  },
  {
    name: 'Flute traversière',
    code: 'fltr'
  },
  {
    name: 'Piccolo',
    code: 'picc'
  },
  {
    name: 'Direction',
    code: 'dire'
  },
  {
    name: 'Hautbois',
    code: 'hboi'
  },
  {
    name: 'Flute à bec',
    code: 'flbe'
  },
  {
    name: 'Clarinette',
    code: 'clar'
  },
  {
    name: 'Clarinette basse',
    code: 'clab'
  },
  {
    name: 'Saxophone soprano',
    code: 'saso'
  },
  {
    name: 'Saxophone alto',
    code: 'salt'
  },
  {
    name: 'Saxophone ténor',
    code: 'saxt'
  },
  {
    name: 'Saxophone baryton',
    code: 'sabt'
  },
  {
    name: 'Guitare basse',
    code: 'guib'
  },
  {
    name: 'Guitare',
    code: 'guit'
  },
  {
    name: 'Sousaphone',
    code: 'sous'
  },
  {
    name: 'Tuba',
    code: 'tuba'
  },
  {
    name: 'Tuba basse',
    code: 'tubb'
  },
  {
    name: 'GROSSE BASSE',
    code: 'grob'
  },
  {
    name: 'Basson',
    code: 'baso'
  },
  {
    name: 'Serpent',
    code: 'serp'
  },
  {
    name: 'Buccin',
    code: 'bucc'
  },
  {
    name: 'Tambour',
    code: 'tamb'
  },
  {
    name: 'Percussions',
    code: 'perc'
  },
  {
    name: 'Grosse caisse',
    code: 'groc'
  },
  {
    name: 'Petite caisse',
    code: 'ptca'
  },
  {
    name: 'Lansquenet',
    code: 'lans'
  },
  {
    name: 'Timballes',
    code: 'timb'
  },
  {
    name: 'Cymbales',
    code: 'cymb'
  },
  {
    name: 'Trombone',
    code: 'trob'
  },
  {
    name: 'Cor',
    code: 'fhor'
  },
  {
    name: 'Trompette',
    code: 'trop'
  },
  {
    name: 'Cornet',
    code: 'corn'
  },
  {
    name: 'Bugle',
    code: 'bugl'
  },
  {
    name: 'Tchik boum',
    code: 'boum'
  },
  {
    name: 'Clavier / Piano',
    code: 'clav'
  },
  {
    name: 'Chapeau Chinois',
    code: 'chin'
  }
];

export default instruments;

// At some point I noticed having some
// kind of lookup table would be nice.
const instrumentCodes = instruments.reduce(
  (acc, i) => {
    acc[i.code] = i.name;
    return acc;
  },
  {}
);

export { instrumentCodes };