import Logo, { LogoInline, SushiMark } from './Logo.jsx'

export default {
  title: 'Components/Logo',
  component: Logo,
  subcomponents: { LogoInline, SushiMark },
  decorators: [(Story) => <div className="flex justify-center p-6"><Story /></div>],
}

// The full logo (Settings, About): the three-line wordmark with the sushi in front.
export const Full = {}

// The main page's header: the wordmark alone, one heavy yellow line.
export const Inline = { render: () => <LogoInline /> }

// The sushi by itself.
export const Sushi = { render: () => <div style={{ width: "6rem" }}><SushiMark className="w-full" /></div> }
