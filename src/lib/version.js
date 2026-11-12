// Version names (Dan, 2026-11-12): the deploys take the animals in alphabetical order, one after another with no
// daily reset, from Aardvark to Zebra and then back to Aardvark. That is the only rule.
// src/version.json holds the deploy's number (counting up for good; the pre-push hook refuses a push that hasn't moved
// it on by one), the day (local date, for the record) and seq, the name's place in the run; `npm run bump` moves
// them on. Shown in the lower left of the opening screen and on the Developer page. A push to dev takes the next
// number; a promote carries dev's number to main unchanged, so both sites show the same name for the same build.
import data from '../version.json' with { type: 'json' }

export const ANIMALS = [
  'Aardvark', 'Badger', 'Capybara', 'Dolphin', 'Elephant', 'Flamingo', 'Gecko', 'Hedgehog', 'Iguana', 'Jaguar', 'Koala', 'Lemur', 'Meerkat',
  'Narwhal', 'Otter', 'Penguin', 'Quokka', 'Raccoon', 'Seal', 'Tapir', 'Urchin', 'Vole', 'Walrus', 'Xerus', 'Yak', 'Zebra',
]

// 1 is Aardvark, 26 is Zebra, 27 is Aardvark again.
export const versionName = (seq) => ANIMALS[(((seq - 1) % ANIMALS.length) + ANIMALS.length) % ANIMALS.length]

export const version = { number: data.number, day: data.day ?? '', name: versionName(data.seq ?? data.number) }

// Two sites (Dan, 2026-11-11): main (tamago-83f.pages.dev) is the stable one and changes only when Dan says
// "promote"; dev (dev.tamago-83f.pages.dev) gets every push. A build for any branch but main says which, next to
// the version name, so the two are never mistaken for each other. Empty on main and in local builds.
const branch = typeof __DEPLOY_BRANCH__ === 'undefined' ? '' : __DEPLOY_BRANCH__
export const site = branch && branch !== 'main' ? branch[0].toUpperCase() + branch.slice(1) : ''
