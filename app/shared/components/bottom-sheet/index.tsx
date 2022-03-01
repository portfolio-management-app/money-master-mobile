import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { colorScheme } from 'shared/styles';

interface IProps {
  ref: any;
  children: JSX.Element | undefined;
}

export const BottomSheet = ({ ref, children }: IProps) => {
  return (
    <RBSheet
      closeOnPressMask
      ref={ref}
      closeOnDragDown={true}
      customStyles={{
        wrapper: {
          backgroundColor: colorScheme.loading,
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
      }}
    >
      {children}
    </RBSheet>
  );
};
