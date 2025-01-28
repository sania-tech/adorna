import { render, act } from '@testing-library/react';
import Verify from './Verify';
import { ShopContext } from '../context/ShopContest';
import axios from 'axios';
import { toast } from 'react-toastify';

// Mock axios and toast
jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('Verify', () => {
  const mockNavigate = jest.fn();
  const mockSetCartItems = jest.fn();

  const mockContextValue = {
    navigate: mockNavigate,
    token: 'mockToken',
    setCartItems: mockSetCartItems,
    backendUrl: 'https://adorna-backend.vercel.app',
  };

  beforeEach(() => {
    axios.post.mockResolvedValue({ data: { success: true } });
  });

  it('should verify payment and navigate to orders on success', async () => {
    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation((key) => {
      if (key === 'success') return 'true';
      if (key === 'orderId') return 'mockOrderId';
    });

    await act(async () => {
      render(
        <ShopContext.Provider value={mockContextValue}>
          <Verify />
        </ShopContext.Provider>
      );
    });

    expect(axios.post).toHaveBeenCalledWith(
      'https://adorna-backend.vercel.app/api/order/verifyStripe',
      { success: 'true', orderId: 'mockOrderId' },
      { headers: { token: 'mockToken' } }
    );

    expect(mockSetCartItems).toHaveBeenCalledWith({});
    expect(mockNavigate).toHaveBeenCalledWith('/orders');
  });

  it('should navigate to cart on payment failure', async () => {
    axios.post.mockResolvedValue({ data: { success: false } });

    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation((key) => {
      if (key === 'success') return 'false';
      if (key === 'orderId') return 'mockOrderId';
    });

    await act(async () => {
      render(
        <ShopContext.Provider value={mockContextValue}>
          <Verify />
        </ShopContext.Provider>
      );
    });

    expect(axios.post).toHaveBeenCalledWith(
      'https://adorna-backend.vercel.app/api/order/verifyStripe',
      { success: 'false', orderId: 'mockOrderId' },
      { headers: { token: 'mockToken' } }
    );

    expect(mockNavigate).toHaveBeenCalledWith('/cart');
  });

  it('should show error toast on API failure', async () => {
    axios.post.mockRejectedValue({ message: 'API Error' });

    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation((key) => {
      if (key === 'success') return 'true';
      if (key === 'orderId') return 'mockOrderId';
    });

    await act(async () => {
      render(
        <ShopContext.Provider value={mockContextValue}>
          <Verify />
        </ShopContext.Provider>
      );
    });

    expect(toast.error).toHaveBeenCalledWith('API Error');
  });
});