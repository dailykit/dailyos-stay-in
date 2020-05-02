import React from 'react'

import {
   TextButton,
   useSingleList,
   List,
   ListItem,
   ListOptions,
   ListSearch,
} from '@dailykit/ui'

import { CloseIcon } from '../../../../../../assets/icons'
import { TunnelHeader, TunnelBody } from '../styled'
import { InventoryProductContext } from '../../../../../../context/product/inventoryProduct'

import { useTranslation, Trans } from 'react-i18next'

const address = 'apps.online_store.views.forms.product.inventoryproduct.tunnels.itemtunnel.'

export default function ItemTunnel({ close, items }) {
   const { t } = useTranslation()
   const { state, dispatch } = React.useContext(InventoryProductContext)

   const [search, setSearch] = React.useState('')
   const [list, current, selectOption] = useSingleList(items)

   const selectItem = item => {
      selectOption('id', item.id)
      dispatch({
         type: 'ITEM',
         payload: { value: item },
      })
      close(3)
      close(2)
   }

   return (
      <React.Fragment>
         <TunnelHeader>
            <div>
               <span onClick={() => close(3)}>
                  <CloseIcon color="#888D9D" />
               </span>
               <span>{t(address.concat('select an item'))}</span>
            </div>
         </TunnelHeader>
         <TunnelBody>
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
                     .filter(option =>
                        option.title.toLowerCase().includes(search)
                     )
                     .map(option => (
                        <ListItem
                           type="SSL1"
                           key={option.id}
                           title={option.title}
                           isActive={option.id === current.id}
                           onClick={() => selectItem(option)}
                        />
                     ))}
               </ListOptions>
            </List>
         </TunnelBody>
      </React.Fragment>
   )
}
