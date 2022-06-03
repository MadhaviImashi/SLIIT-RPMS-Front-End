import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUp from '../components/SignUpPage/Student/SignUp';
import 'regenerator-runtime/runtime.js';
import { BrowserRouter } from 'react-router-dom';

test('email input should be rendered', () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );
  const emailInputEl = screen.getByPlaceholderText(/Email/i);
  expect(emailInputEl).toBeInTheDocument();
});

test('name input should be rendered', () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );
  const nameInputEl = screen.getByPlaceholderText(/Name/i);
  expect(nameInputEl).toBeInTheDocument();
});

test('SignUp button should be rendered', () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );
  const buttonEl = screen.getByRole('button');
  expect(buttonEl).toBeInTheDocument();
});

test('email input should be empty', () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );
  const emailInputEl = screen.getByPlaceholderText(/Email/i);
  expect(emailInputEl.value).toBe('');
});

test('name input should be empty', () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );
  const nameInputEl = screen.getByPlaceholderText(/Name/i);
  expect(nameInputEl.value).toBe('');
});

test('SignUp button should be disabled', () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );
  const buttonEl = screen.getByRole('button');
  expect(buttonEl).not.toBeDisabled();
});

test('email input should change', () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );
  const emailInputEl = screen.getByPlaceholderText(/Email/i);
  const testValue = 'test@gmail.com';

  fireEvent.change(emailInputEl, { target: { value: testValue } });
  expect(emailInputEl.value).toBe(testValue);
});

test('name input should change', () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );
  const nameInputEl = screen.getByPlaceholderText(/Name/i);
  const testValue = 'test@123';

  fireEvent.change(nameInputEl, { target: { value: testValue } });
  expect(nameInputEl.value).toBe(testValue);
});
