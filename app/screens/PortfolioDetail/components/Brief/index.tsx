import { observer } from 'mobx-react-lite';
import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { ExpandableSection } from 'react-native-ui-lib';
import {
  AssetSectionHeader,
  Empty,
  HorizontalBarChart,
  PlatformView,
} from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { PortfolioDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { PieChartAsset } from './components';
import { buildNewPieChartData, calculationPercent } from './helper';

export const Brief = observer(() => {
  const [showAllocation, setShowAllocation] = React.useState(true);
  const [showDetail, setShowDetail] = React.useState(true);
  const { pieChartInformation, getPieChart, information, loadingGetPieChart } =
    PortfolioDetailStore;
  console.log(pieChartInformation);
  React.useEffect(() => {
    getPieChart();
  }, [getPieChart]);
  const pies = React.useMemo(() => {
    return buildNewPieChartData(pieChartInformation);
  }, [pieChartInformation]);

  const renderLabels = React.useMemo(() => {
    return calculationPercent(pies);
  }, [pies]);
  console.log(renderLabels);
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
          {pies.length ? (
            <PieChartAsset renderLabels={renderLabels} data={pies} />
          ) : (
            <Empty />
          )}
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
          {renderLabels.length ? (
            <HorizontalBarChart
              currency={information.initialCurrency}
              data={renderLabels}
            />
          ) : (
            <Empty />
          )}
        </ExpandableSection>
      </ScrollView>
    </PlatformView>
  );
});
