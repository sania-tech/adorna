import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ShopContext } from '../context/ShopContest'; // Adjust the import path
import Verify from './Verify'; // Adjust the import path
import axios from 'axios';
import { toast } from 'react-toastify';

// Mock axios and toast
jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('Verify Component', () => {
  const mockNavigate = jest.fn();
  const mockSetCartItems = jest.fn();

  const mockContext = {
    navigate: mockNavigate,
    token: 'mockToken',
    setCartItems: mockSetCartItems,
    backendUrl: 'http://mock-backend-url',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls verifyPayment and navigates on success', async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true } }); // Mock API response for success

    render(
      <BrowserRouter>
        <ShopContext.Provider value={mockContext}>
          <Verify />
        </ShopContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      // Check if verifyPayment sends the right request
      expect(axios.post).toHaveBeenCalledWith(
        'http://mock-backend-url/api/order/verifyStripe',
        { success: null, orderId: null },
        { headers: { token: 'mockToken' } }
      );

      // Verify successful navigation
      expect(mockNavigate).toHaveBeenCalledWith('/orders');
    });
  });

  test('navigates to cart on failure', async () => {
    axios.post.mockResolvedValueOnce({ data: { success: false } }); // Mock API response for failure

    render(
      <BrowserRouter>
        <ShopContext.Provider value={mockContext}>
          <Verify />
        </ShopContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/cart');
    });
  });

  test('shows error toast on exception', async () => {
    axios.post.mockRejectedValueOnce(new Error('Test Error')); // Mock API rejection

    render(
      <BrowserRouter>
        <ShopContext.Provider value={mockContext}>
          <Verify />
        </ShopContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Test Error');
    });
  });
});
