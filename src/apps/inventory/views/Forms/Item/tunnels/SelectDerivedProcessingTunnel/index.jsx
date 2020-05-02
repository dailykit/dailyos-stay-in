import React, { useState, useContext } from 'react'
import {
   List,
   ListItem,
   ListSearch,
   ListOptions,
   useSingleList,
} from '@dailykit/ui'

import { ItemContext } from '../../../../../context/item'

import {
   TunnelContainer,
   TunnelHeader,
   Spacer,
} from '../../../../../components'

export default function SelectDerivedProcessingTunnel({
   close,
   next,
   processings,
   rawProcessings,
}) {
   const { state, dispatch } = useContext(ItemContext)
   const [search, setSearch] = React.useState('')

   const [list, current, selectOption] = useSingleList(processings)

   return (
      <TunnelContainer>
         <TunnelHeader
            title="Select Processing"
            next={() => {
               const payload = rawProcessings.find(
                  processing => processing.id === current.id
               )
               dispatch({ type: 'ADD_DERIVED_PROCESSING', payload })
               dispatch({
                  type: 'ADD_CONFIGURABLE_PROCESSING',
                  payload: current,
               })
               close(6)
               next(7)
            }}
            close={() => close(6)}
            nextAction="Save"
         />

         <Spacer />

         <List>
            {Object.keys(current).length > 0 ? (
               <ListItem type="SSL1" title={current.title} />
            ) : (
               <ListSearch
                  onChange={value => setSearch(value)}
                  placeholder="type what you’re looking for..."
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
