import React, { useState, useContext } from 'react'
import {
   List,
   ListItem,
   ListOptions,
   ListSearch,
   useSingleList,
} from '@dailykit/ui'

import { BulkOrderContext } from '../../../../context/bulkOrder'

import { TunnelContainer, TunnelHeader, Spacer } from '../../../../components'

import { useTranslation } from 'react-i18next'

const address = 'apps.inventory.views.forms.bulkworkorder.tunnels.'

export default function SelectStationTunnel({ close }) {
   const { t } = useTranslation()
   const { bulkOrderDispatch } = useContext(BulkOrderContext)

   const [search, setSearch] = React.useState('')

   const [list, current, selectOption] = useSingleList([
      { id: 1, title: 'Station 1' },
      { id: 2, title: 'Station 2' },
      { id: 3, title: 'Station 3' },
      { id: 4, title: 'Station 4' },
   ])

   return (
      <TunnelContainer>
         <TunnelHeader
            title={t(address.concat("select station"))}
            next={() => {
               bulkOrderDispatch({ type: 'ADD_STATION', payload: current })
               close(4)
            }}
            close={() => close(4)}
            nextAction="Save"
         />

         <Spacer />

         <List>
            {Object.keys(current).length > 0 ? (
               <ListItem type="SSL1" title={current.title} />
            ) : (
                  <ListSearch
                     onChange={value => setSearch(value)}
                     placeholder={t(address.concat("type what you’re looking for"))}
                  />
               )}
            <ListOptions>
               {list
                  .filter(option => option.title.toLowerCase().includes(search))
                  .map(option => (
                     <ListItem
                        type="SSL1"
                        key={option.id}
                        title={option.title}
                        isActive={option.id === current.id}
                        onClick={() => selectOption('id', option.id)}
                     />
                  ))}
            </ListOptions>
         </List>
      </TunnelContainer>
   )
}