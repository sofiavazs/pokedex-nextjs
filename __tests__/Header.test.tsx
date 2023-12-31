/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import Header from '@/app/components/ui/Header';
import '@testing-library/jest-dom';

describe('Header', () => {
  it('renders the header element', () => {
    render(<Header headerText='test header' icon={""} />)

    const heading = screen.findByRole('header', {
      name: 'test header',
    })

    waitFor(() => expect(heading).toBeInTheDocument());
  })
});


