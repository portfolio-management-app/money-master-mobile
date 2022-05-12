import React from 'react';
import { SkeletonView } from 'react-native-ui-lib';

interface IProps {
  times: number;
}

export const Skeleton = ({ times }: IProps) => {
  const renderItems = [];
  for (let i = 0; i < times; i++) {
    renderItems.push(
      <SkeletonView
        key={i}
        times={10}
        showContent={true}
        template={SkeletonView.templates.LIST_ITEM}
      />
    );
  }
  return <>{renderItems.map((item) => item)}</>;
};
