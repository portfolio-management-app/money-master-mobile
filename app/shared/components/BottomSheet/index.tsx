import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { colorScheme } from 'shared/styles';

interface IProps {
  children: React.ReactNode;
  open: boolean;
  height?: number;
  onClose: () => void;
}

export const BottomSheet = ({ children, open, onClose, height }: IProps) => {
  const ref: any = React.useRef();

  React.useEffect(() => {
    if (open) ref?.current?.open();
    else ref?.current?.close();
  }, [open]);
  return (
    <RBSheet
      ref={ref}
      height={height}
      closeOnPressBack
      closeOnPressMask
      onClose={onClose}
      closeOnDragDown={true}
      customStyles={{
        wrapper: {
          backgroundColor: colorScheme.loading,
        },
        draggableIcon: {
          backgroundColor: colorScheme.black200,
        },
      }}
    >
      {children}
    </RBSheet>
  );
};
