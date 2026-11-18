'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';
import { BookingModal } from './BookingModal';

interface BookingContextValue {
  isOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextValue>({
  isOpen: false,
  openBooking: () => {},
  closeBooking: () => {},
});

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBooking = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <BookingContext.Provider value={{ isOpen, openBooking, closeBooking }}>
      {children}
      <BookingModal isOpen={isOpen} onClose={closeBooking} />
    </BookingContext.Provider>
  );
}

export function useBooking(): { openBooking: () => void; closeBooking?: () => void; isOpen?: boolean } {
  return useContext(BookingContext);
}

export { BookingModal } from './BookingModal';
export { UserForm } from './UserForm';
export default BookingProvider;
