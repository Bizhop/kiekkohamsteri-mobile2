export const imagesUrl = 'https://res.cloudinary.com/djc4j4dcs/'

export const discBasics = kiekko => {
  return `${kiekko.valmistaja} ${kiekko.muovi} ${kiekko.mold} ${kiekko.paino}g (${kiekko.vari}) ${kiekko.kunto}/10`
}
export const discStats = kiekko => {
  return `${kiekko.nopeus} / ${kiekko.liito} / ${kiekko.vakaus} / ${kiekko.feidi}`
}
