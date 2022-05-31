import { observer } from 'mobx-react-lite';
import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { ExpandableSection, SkeletonView } from 'react-native-ui-lib';
import {
  AssetSectionHeader,
  Empty,
  HorizontalBarChart,
  PlatformView,
  Skeleton,
  SkeletonLoadable,
} from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { PortfolioDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { PieChartAsset } from './components';
import { buildNewPieChartData, calculationPercent } from './helper';

export const Brief = observer(() => {
  const [showAllocation, setShowAllocation] = React.useState(true);
  const [showDetail, setShowDetail] = React.useState(true);
  const {
    pieChartInformation,
    getPieChart,
    information,
    loadingGetPieChart,
    pieChartCount,
  } = PortfolioDetailStore;

  const pies = React.useMemo(() => {
    console.log('PIE CHART COUNT', pieChartCount);
    return buildNewPieChartData(pieChartInformation);
  }, [pieChartCount, pieChartInformation]);

  const renderLabels = React.useMemo(() => {
    return calculationPercent(pies);
  }, [pies]);

  return (
    <PlatformView style={styleProvider.body}>
      <RefreshControl
        refreshing={loadingGetPieChart}
        onRefresh={() => getPieChart()}
      />
      <ScrollView>
        <ExpandableSection
          expanded={showAllocation}
          onPress={() => setShowAllocation(!showAllocation)}
          sectionHeader={
            <AssetSectionHeader
              style={{ marginHorizontal: 20 }}
              open={showAllocation}
              title={ASSET_DETAIL_CONTENT.assetAllocation}
            />
          }
        >
          <SkeletonLoadable
            skeleton={
              <View>
                <View style={styleProvider.centerVertical}>
                  <SkeletonView circle width={80} height={80} />
                </View>

                <Skeleton times={3} />
              </View>
            }
            isDataEmpty={pies.length === 0}
            dataComponent={
              <PieChartAsset renderLabels={renderLabels} data={pies} />
            }
            loading={loadingGetPieChart}
            emptyComponent={<Empty />}
          />
        </ExpandableSection>
        <ExpandableSection
          expanded={showDetail}
          onPress={() => setShowDetail(!showDetail)}
          sectionHeader={
            <AssetSectionHeader
              style={{ marginHorizontal: 20 }}
              open={showDetail}
              title={ASSET_DETAIL_CONTENT.detail}
            />
          }
        >
          <SkeletonLoadable
            skeleton={<Skeleton times={3} />}
            isDataEmpty={renderLabels.length === 0}
            dataComponent={
              <HorizontalBarChart
                currency={information.initialCurrency}
                data={renderLabels}
              />
            }
            loading={loadingGetPieChart}
            emptyComponent={
              <View style={styleProvider.flexCenter}>
                <Empty />
              </View>
            }
          />
        </ExpandableSection>
      </ScrollView>
    </PlatformView>
  );
});
