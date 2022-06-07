import { useState } from 'react';

export function useBounceError() {
  const [boundError, setBoundError] = useState({
    message: '',
    isError: false,
  });

  function makeError(message: string) {
    setBoundError({
      isError: true,
      message: message,
    });
  }
  function clearError() {
    setBoundError({
      isError: false,
      message: '',
    });
  }
  return { boundError, makeError, clearError };
}
