import { useMutation, useSubscription } from '@apollo/react-hooks'
import {
   Filler,
   List,
   ListHeader,
   ListItem,
   ListOptions,
   ListSearch,
   TunnelHeader,
   useSingleList,
} from '@dailykit/ui'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Banner, Tooltip } from '../../../../../../shared/components'
import { InlineLoader } from '../../../../../../shared/components/InlineLoader'
import { logger } from '../../../../../../shared/utils'
import { TunnelContainer } from '../../../../components'
import { GENERAL_ERROR_MESSAGE } from '../../../../constants/errorMessages'
import { NO_BULK_ITEMS } from '../../../../constants/infoMessages'
import {
   GET_BULK_ITEMS_SUBSCRIPTION,
   UPDATE_BULK_WORK_ORDER,
} from '../../../../graphql'

const address = 'apps.inventory.views.forms.bulkworkorder.tunnels.'

export default function SelectInputBulkItemTunnel({ close, state }) {
   const { t } = useTranslation()
   const [search, setSearch] = useState('')
   const [bulkItems, setBulkItems] = useState([])
   const [list, current, selectOption] = useSingleList(bulkItems)

   const { loading, error } = useSubscription(GET_BULK_ITEMS_SUBSCRIPTION, {
      variables: {
         supplierItemId: state.supplierItem.id,
      },
      onSubscriptionData: data => {
         const { bulkItems } = data.subscriptionData.data

         setBulkItems(bulkItems)
      },
   })

   const [updateBulkWorkOrder, { loading: updating }] = useMutation(
      UPDATE_BULK_WORK_ORDER,
      {
         onError: error => {
            logger(error)
            toast.error(GENERAL_ERROR_MESSAGE)
         },
         onCompleted: () => {
            toast.success('Input Bulk Item added!')
            close(1)
         },
      }
   )

   if (error) {
      logger(error)
      toast.error(GENERAL_ERROR_MESSAGE)
      return null
   }

   const handleSave = option => {
      updateBulkWorkOrder({
         variables: {
            id: state.id,
            object: {
               inputBulkItemId: option.id,
            },
         },
      })
   }

   if (loading || updating) return <InlineLoader />

   return (
      <>
         <TunnelHeader
            title={t(address.concat('select input bulk item processing'))}
            close={() => close(1)}
            description="Select input bulk item to use for this work order"
            tooltip={
               <Tooltip identifier="bulk-work-order_add_input_bulk_item_tunnel" />
            }
         />
         <Banner id="inventory-app-work-orders-bulk-input-bulk-item-tunnel-top" />
         <TunnelContainer>
            {list.length ? (
               <List>
                  <ListSearch
                     onChange={value => setSearch(value)}
                     placeholder={t(
                        address.concat("type what you're looking for")
                     )}
                  />
                  <ListHeader type="SSL2" label="bulk item" />
                  <ListOptions>
                     {list
                        .filter(option =>
                           option.processingName.toLowerCase().includes(search)
                        )
                        .map(option => (
                           <ListItem
                              type="SSL2"
                              key={option.id}
                              isActive={option.id === current.id}
                              onClick={() => handleSave(option)}
                              content={{
                                 title: option.processingName,
                                 description: `Shelf Life: ${
                                    option.shelfLife?.value || 'N/A'
                                 } ${option.shelfLife?.unit || ''} On Hand: ${
                                    option.onHand
                                 }`,
                              }}
                           />
                        ))}
                  </ListOptions>
               </List>
            ) : (
               <Filler message={NO_BULK_ITEMS} />
            )}
         </TunnelContainer>
         <Banner id="inventory-app-work-orders-bulk-input-bulk-item-tunnel-bottom" />
      </>
   )
}
