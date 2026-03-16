import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../pages/LoginForm';

describe('LoginForm', () => {

  test('shows validation errors when fields are empty', () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  test('submits form with valid inputs', () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'manthan@gmail.com' }
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: '123456' }
    });

    fireEvent.click(screen.getByText('Submit'));

    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
  });

});