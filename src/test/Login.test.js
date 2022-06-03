import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../components/LoginPage/Login';
// import { createRoot } from 'react-dom/client';
import 'regenerator-runtime/runtime.js';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios', () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, password: 'John' }
    })
  }
}));

// const container = document.getElementById('root');
// const root = createRoot(container);

test('Login email input should be rendered', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const emailInputEl = screen.getByPlaceholderText(/Email/i);
  expect(emailInputEl).toBeInTheDocument();
});

test('Login button should be rendered', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const buttonEl = screen.getByTestId('login-btn');
  expect(buttonEl).toBeInTheDocument();
});

test('Login email input should be empty', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const emailInputEl = screen.getByPlaceholderText(/Email/i);
  expect(emailInputEl.value).toBe('');
});

test('Login password input should be empty', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const passwordInputEl = screen.getByLabelText(/Password/i);
  expect(passwordInputEl.value).toBe('');
});

test('Login button should be disabled', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const buttonEl = screen.getByTestId('login-btn');
  expect(buttonEl).not.toBeDisabled();
});

test('Login email input should change', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const emailInputEl = screen.getByPlaceholderText(/Email/i);
  const testValue = 'test@gmail.com';

  fireEvent.change(emailInputEl, { target: { value: testValue } });
  expect(emailInputEl.value).toBe(testValue);
});

test('Login password input should change', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const passwordInputEl = screen.getByLabelText(/Password/i);
  const testValue = 'test@123';

  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(passwordInputEl.value).toBe(testValue);
});
