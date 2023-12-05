import type { Metadata } from 'next';
import StyledComponentsRegistry from './lib/StyledComponentsRegistry';
import './globals.css';


export const metadata: Metadata = {
  title: 'Pokédex',
  description: 'Pokémon Explorer',
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
          <main>
            {children}
          </main>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
