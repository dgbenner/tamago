// Version names (Dan, 2026-11-11): every deploy gets the next animal, in alphabetical order: Aardvark, Badger,
// Capybara and so on to Zebra, then a second round (Aardvark 2, Badger 2). src/version.json holds the deploy's
// number; `npm run bump` moves it on, and the pre-push hook refuses a push to main that hasn't moved it on by one.
// Shown in the lower left of the opening screen and on the Developer page.
import data from '../version.json' with { type: 'json' }

export const ANIMALS = [
  'Aardvark', 'Badger', 'Capybara', 'Dolphin', 'Elephant', 'Flamingo', 'Gecko', 'Hedgehog', 'Iguana', 'Jaguar', 'Koala', 'Lemur', 'Meerkat',
  'Narwhal', 'Otter', 'Penguin', 'Quokka', 'Raccoon', 'Seal', 'Tapir', 'Urchin', 'Vole', 'Walrus', 'Xerus', 'Yak', 'Zebra',
]

// Deploy 1 is Aardvark, 26 is Zebra, 27 is Aardvark 2.
export function versionName(number) {
  const round = Math.floor((number - 1) / ANIMALS.length) + 1
  const animal = ANIMALS[(number - 1) % ANIMALS.length]
  return round > 1 ? `${animal} ${round}` : animal
}

export const version = { number: data.number, name: versionName(data.number) }
