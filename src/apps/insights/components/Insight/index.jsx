import React, { useState } from 'react'
import { ReactTabulator } from '@dailykit/react-tabulator'
import 'react-tabulator/css/bootstrap/tabulator_bootstrap.min.css'
import 'react-tabulator/lib/styles.css'
import styled from 'styled-components'
import { Flex, Toggle } from '@dailykit/ui'

import '../../../../shared/styled/tableStyles.css'
import { useInsights } from '../../hooks/useInsights'
import { Counter } from '../Counter'
import Chart from './Chart'
import Option from './Option'
import { tableConfig } from './tableConfig'

/**
 *
 * @param {{ includeChart?: boolean, includeTable?: boolean, title: string, nodeKey: string}} props
 */
export default function Insight({
   includeTable = true,
   includeChart = false,
   title = '',
}) {
   const {
      tableData,
      options,
      optionVariables,
      updateOptions,
      aggregates,
      allowedCharts,
      filters,
      switches,
      updateSwitches,
      oldData,
      newData,
   } = useInsights(title, {
      includeTableData: includeTable,
      includeChartData: includeChart,
   })

   const [isDiff, setIsDiff] = useState(false)

   return (
      <>
         <StyledContainer>
            <Flex container alignItems="center">
               <Toggle
                  checked={isDiff}
                  setChecked={setIsDiff}
                  label="Compare"
               />

               <Option
                  options={options}
                  state={optionVariables}
                  updateOptions={updateOptions}
                  filters={filters}
                  switches={switches}
                  updateSwitches={updateSwitches}
                  showColumnToggle
                  isNewOption={false}
               />
            </Flex>
            <CounterBar aggregates={aggregates} />
            {includeChart ? (
               <HeroCharts
                  allowedCharts={allowedCharts}
                  oldData={oldData}
                  newData={newData}
                  isDiff={isDiff}
               />
            ) : null}

            <StyledGrid isDiff={isDiff}>
               {includeChart ? (
                  <FlexCharts
                     allowedCharts={allowedCharts}
                     oldData={oldData}
                     newData={newData}
                     isDiff={isDiff}
                  />
               ) : null}

               {includeTable ? (
                  <>
                     {!includeChart ||
                     !allowedCharts?.filter(
                        chart => chart.layoutType === 'HERO'
                     ).length ? (
                        <Option
                           options={options}
                           state={optionVariables}
                           updateOptions={updateOptions}
                           filters={filters}
                           switches={switches}
                           updateSwitches={updateSwitches}
                        />
                     ) : null}
                  </>
               ) : null}
            </StyledGrid>
            <ReactTabulator
               columns={[]}
               options={tableConfig}
               data={tableData}
            />
         </StyledContainer>
      </>
   )
}

function HeroCharts({ allowedCharts, oldData, newData, isDiff }) {
   if (!allowedCharts?.length) return null

   return allowedCharts
      ?.filter(chart => chart.layoutType === 'HERO')
      .map(chart => (
         <>
            <Chart
               oldData={oldData}
               newData={newData}
               chart={chart}
               isDiff={isDiff}
            />
         </>
      ))
}

function FlexCharts({ allowedCharts, oldData, newData, isDiff }) {
   if (!allowedCharts?.length) return null

   return allowedCharts
      ?.filter(chart => chart.layoutType === 'FLEX')
      .map(chart => {
         return (
            <Chart
               oldData={oldData}
               newData={newData}
               chart={chart}
               isDiff={isDiff}
            />
         )
      })
}

function CounterBar({ aggregates }) {
   const keys = (aggregates && Object.keys(aggregates)) || []

   if (keys.length) return <Counter aggregates={aggregates} keys={keys} />
   return null
}

const StyledContainer = styled.div`
   position: relative;
   width: 95vw;
   margin: 1rem auto;
   padding: 1rem 2rem;
   background: #ffffff;
   border-radius: 10px;
   overflow-x: auto;
`
const StyledGrid = styled.div`
   display: grid;
   grid-template-columns: ${({ isDiff }) => (isDiff ? '1fr' : '1fr 1fr')};
   gap: 1rem;
`
export { CounterBar }
