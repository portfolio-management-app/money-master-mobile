import { useEffect, useRef, useState } from 'react';

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useConfirmSheet = () => {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };

  return { show, toggle };
};

export const useLoading = () => {
  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };
  return { loading, startLoading, stopLoading };
};
