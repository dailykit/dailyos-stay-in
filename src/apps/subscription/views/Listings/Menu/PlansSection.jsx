import React from 'react'
import moment from 'moment'
import { Text } from '@dailykit/ui'
import styled from 'styled-components'
import { ReactTabulator } from 'react-tabulator'
import { useSubscription } from '@apollo/react-hooks'

import { useMenu } from './state'
import tableOptions from '../../../tableOption'
import { SUBSCRIPTION_OCCURENCES } from '../../../graphql'

const PlansSection = () => {
   const tableRef = React.useRef()
   const { state, dispatch } = useMenu()
   const {
      loading,
      data: { subscriptionOccurences = {} } = {},
   } = useSubscription(SUBSCRIPTION_OCCURENCES, {
      variables: {
         fulfillmentDate: {
            _in: [moment(state.date).format('YYYY-MM-DD')],
         },
      },
   })

   const columns = [
      {
         hozAlign: 'center',
         headerSort: false,
         formatter: 'rowSelection',
      },
      {
         title: 'Servings',
         headerFilter: true,
         headerFilterPlaceholder: 'Search servings...',
         field: 'subscription.itemCount.serving.size',
      },
      {
         title: 'Title',
         headerFilter: true,
         headerFilterPlaceholder: 'Search titles...',
         field: 'subscription.itemCount.serving.subscriptionTitle.title',
      },
      {
         title: 'Item Count',
         headerFilter: true,
         headerFilterPlaceholder: 'Search item counts...',
         field: 'subscription.itemCount.count',
      },
      {
         title: 'Cut Off',
         field: 'cutoffTimeStamp',
         formatter: ({ _cell: { value } }) =>
            moment(value).format('MMM DD HH:MM A'),
      },
      {
         title: 'Start Time',
         field: 'startTimeStamp',
         formatter: ({ _cell: { value } }) =>
            moment(value).format('MMM DD HH:MM A'),
      },
      {
         title: 'Products',
         field: 'products.aggregate.count',
      },
      {
         title: 'Customers',
         field: 'subscription.customers.aggregate.count',
      },
   ]

   const handleRowSelection = row => {
      const data = row.getData()

      if (row.isSelected()) {
         dispatch({
            type: 'SET_PLAN',
            payload: {
               occurence: { id: data.id },
               subscription: { id: data.subscription.id },
               serving: { size: data.subscription.itemCount.serving.size },
            },
         })
      } else {
         dispatch({
            type: 'REMOVE_PLAN',
            payload: data.id,
         })
      }
   }

   return (
      <Wrapper>
         <Text as="h2">Plans</Text>
         {!state.date && <span>Select a date to view plans.</span>}
         {!loading && subscriptionOccurences?.aggregate?.count > 0 && (
            <ReactTabulator
               ref={tableRef}
               columns={columns}
               rowSelected={handleRowSelection}
               rowDeselected={handleRowSelection}
               data={subscriptionOccurences.nodes}
               options={{
                  ...tableOptions,
                  selectable: true,
                  groupBy:
                     'subscription.itemCount.serving.subscriptionTitle.title',
               }}
            />
         )}
      </Wrapper>
   )
}

export default PlansSection

const Wrapper = styled.main`
   padding: 0 16px;
`
