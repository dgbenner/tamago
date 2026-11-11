// A1 Complete (Dan, 2026-11-10; _source/a1-complete.md): A1 in parts, and the thirteen A1 tasks.
// The part count per course comes from its gap to 90% of its official A1 list (scripts/a1-coverage.mjs) at about
// 12 new words a circle, the rate of Part 1: German about 450 words to go, Spanish about 375, French about 920 (FLELex
// A1 is nearly twice the Goethe list). Titles and summaries of the parts not built yet are the plan, shown on the
// tree's locked banner; they change as the parts are written.
// Used by scripts/add-a1-plan.mjs (French workbook) and the Spanish and German workbook generators.

export const A1_TASKS = [
  ['T01', 'Introduce yourself and someone else'],
  ['T02', 'Spell your name; give and understand phone numbers'],
  ['T03', 'Give and understand age, address and nationality'],
  ['T04', 'Numbers, prices and quantities when shopping'],
  ['T05', 'Times, days and dates; making a simple plan'],
  ['T06', 'Ask and answer about home, family and work'],
  ['T07', 'Order food and drink'],
  ['T08', 'Ask for and follow simple directions'],
  ['T09', 'Understand signs, notices, menus and timetables'],
  ['T10', 'Fill in a simple form'],
  ['T11', 'Write a short message or postcard (about 30 to 40 words)'],
  ['T12', 'Understand short announcements and simple instructions'],
  ['T13', 'Ask for help: repeat, slower, spell, how do you say'],
]

const FIRST = { part: 1, title: 'First Steps', summary: 'Hello and goodbye, people and things, food, animals, describing, questions, numbers to ten, colours, days and going places, with asking for help.', tasks: 'T01;T13', status: 'live' }
const PLAN4 = [
  FIRST,
  { part: 2, title: 'Everyday Life', summary: 'Spelling and phone numbers, age, address and nationality, numbers to 100, prices and shopping.', tasks: 'T02;T03;T04', status: 'planned' },
  { part: 3, title: 'Time and Plans', summary: 'Times, days, months and dates, making plans, and reading signs, timetables and short announcements.', tasks: 'T05;T09;T12', status: 'planned' },
  { part: 4, title: 'Out and About', summary: 'Ordering food and drink, directions, home, family and work, forms and short messages.', tasks: 'T06;T07;T08;T10;T11', status: 'planned' },
]
const PLAN6 = [
  FIRST,
  PLAN4[1],
  PLAN4[2],
  { part: 4, title: 'Out and About', summary: 'Ordering food and drink, finding the way, shops and the market.', tasks: 'T07;T08', status: 'planned' },
  { part: 5, title: 'Home and Work', summary: 'Home, family and work, filling in forms, and the words of daily life.', tasks: 'T06;T10', status: 'planned' },
  { part: 6, title: 'Reading and Writing', summary: 'Menus, notices and messages, and writing a short message or postcard.', tasks: 'T09;T11;T12', status: 'planned' },
]
export const PARTS = { de: PLAN4, es: PLAN4, fr: PLAN6 }

// Circles that teach a task outright (more as the parts are written).
export const UNIT_TASKS = { U01: 'T01', U31: 'T13', U32: 'T13', U33: 'T13' }

// Adds the plan to a workbook in place: the parts and a1_tasks tabs, and part and tasks columns on units (every
// existing unit is Part 1).
export function addA1Plan(wb, XLSX, lang) {
  const put = (n, rows) => {
    const sheet = XLSX.utils.json_to_sheet(rows)
    if (!wb.SheetNames.includes(n)) wb.SheetNames.push(n)
    wb.Sheets[n] = sheet
  }
  put('parts', PARTS[lang])
  put('a1_tasks', A1_TASKS.map(([task_id, task]) => ({ task_id, task })))
  // The A1 task question types' items (QT14 to QT17), empty until the parts write them. One row per item, tied to a
  // circle; questions and fields as JSON in a cell.
  const tab = (n, cols) => { if (!wb.SheetNames.includes(n)) { wb.SheetNames.push(n); wb.Sheets[n] = XLSX.utils.aoa_to_sheet([cols]) } }
  tab('a1_texts', ['id', 'unit_id', 'kind', 'title', 'lines', 'questions_json', 'source', 'status', 'notes'])
  tab('a1_forms', ['id', 'unit_id', 'card', 'fields_json', 'status', 'notes'])
  tab('a1_prompts', ['id', 'unit_id', 'prompt', 'points', 'min_words', 'max_words', 'status', 'notes'])
  tab('a1_listen', ['id', 'unit_id', 'kind', 'say', 'answer', 'status', 'notes'])
  // The four types join the question_types tab (their logic: src/lib/a1types.js).
  const qt = XLSX.utils.sheet_to_json(wb.Sheets.question_types, { defval: '' }).filter((q) => !['QT14', 'QT15', 'QT16', 'QT17'].includes(q.type_id))
  qt.push(
    { type_id: 'QT14', key: 'read_text', name: 'Read a short text and answer', skill: 'reading', recognition_or_recall: 'recognition', input: 'choice', needs_audio: 'no', needs_image: 'no', first_round: 2, last_round: 5, notes: 'A menu, sign, timetable or message from known words, then 2 to 3 questions (A1 Complete)' },
    { type_id: 'QT15', key: 'fill_form', name: 'Fill in a form', skill: 'writing', recognition_or_recall: 'recall', input: 'fields', needs_audio: 'no', needs_image: 'no', first_round: 3, last_round: 5, notes: 'Name, age, address, nationality, phone from a short card; checked by rules (A1 Complete)' },
    { type_id: 'QT16', key: 'write_message', name: 'Write a short message', skill: 'writing', recognition_or_recall: 'recall', input: 'text', needs_audio: 'no', needs_image: 'no', first_round: 4, last_round: 5, notes: 'Claude gives feedback on meaning, grammar and missing points; not scored; counts as done (A1 Complete)' },
    { type_id: 'QT17', key: 'listen_number', name: 'Listen and write the number', skill: 'listening', recognition_or_recall: 'recall', input: 'typed', needs_audio: 'yes', needs_image: 'no', first_round: 2, last_round: 5, notes: 'Number, price, time or date; checked as a value, not text; read instead with Can\'t Listen Now (A1 Complete)' },
  )
  wb.Sheets.question_types = XLSX.utils.json_to_sheet(qt)
  const units = XLSX.utils.sheet_to_json(wb.Sheets.units, { defval: '' }).map((u) => ({ ...u, part: u.part || 1, tasks: UNIT_TASKS[u.unit_id] ?? u.tasks ?? '' }))
  wb.Sheets.units = XLSX.utils.json_to_sheet(units)
}
