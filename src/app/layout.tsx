import type { Metadata } from 'next';
import StyledComponentsRegistry from './lib/StyledComponentsRegistry';
import Header from './components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pokédex',
  description: 'Pokémon Explorer',
  icons: {
    icon: "/assets/favicon.ico"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Header
            headerText={"Pokémon Explorer"}
            icon={"./assets/icon-pokeball.svg"}
            url={"/"}
          />
          <main>
            {children}
          </main>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
