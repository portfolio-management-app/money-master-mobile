import React from 'react';

interface IProps {
  skeleton: React.ReactNode;
  dataComponent: React.ReactNode;
  loading: boolean;
  isDataEmpty: boolean;
  emptyComponent: React.ReactNode;
}

const RenderComponent = ({
  skeleton,
  dataComponent,
  loading,
  isDataEmpty,
  emptyComponent,
}: IProps) => {
  return (
    <>
      {loading ? (
        <>{skeleton}</>
      ) : (
        <>{isDataEmpty ? emptyComponent : dataComponent}</>
      )}
    </>
  );
};

export const SkeletonLoadable = React.memo(RenderComponent);
