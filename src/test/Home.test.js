import Hero from '../components/Home Page/Hero/Hero';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

test('Title in home page should be correct', () => {
  render(
    <BrowserRouter>
      <Hero />
    </BrowserRouter>
  );
  const buttonEl = screen.getByTestId('home-title');
  expect(buttonEl.innerHTML).toBe('Research with easy management and collaboration');
});
