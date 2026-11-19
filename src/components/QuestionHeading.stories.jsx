import QuestionHeading from './QuestionHeading.jsx'

// The heading sits in the lesson's h1, sometimes with the New tag beside it (both from Lesson.jsx).
const Row = ({ tag, children }) => (
  <main className="lesson mx-auto flex max-w-md flex-col px-4 pt-5 lg:max-w-4xl">
    <div className="flex items-center gap-2">
      <h1 className="text-xl font-semibold outline-none">{children}</h1>
      {tag && <span className="tag"><span className="new-dot" aria-hidden="true" />New</span>}
    </div>
  </main>
)

export default {
  title: 'Components/QuestionHeading',
  component: QuestionHeading,
  args: { english: 'Pick the Meaning', part: 1 },
  render: ({ tag, ...args }) => <Row tag={tag}><QuestionHeading {...args} /></Row>,
}

// Parts 1 and 2: the heading is in English.
export const English = {}

// A question that shows a new word carries the New tag.
export const WithNewTag = { args: { tag: true } }

// From Part 3 the heading is in the course language; tap it to see the English beside it.
export const InTheCourseLanguage = { args: { part: 3 } }
