import { render, screen } from '@testing-library/react';
import StartScreen from './StartScreen';

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => children,
  Routes: ({ children }) => children,
  Route: ({ element }) => element,
  useNavigate: () => jest.fn(),
}), { virtual: true });

test('renders the start screen', () => {
  render(<StartScreen />);
  expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
});
