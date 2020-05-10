import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ButtonTile, ComboButton, IconButton } from '@dailykit/ui'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Accompaniments } from '../'
import {
   DeleteIcon,
   EditIcon,
} from '../../../../../../../../shared/assets/icons'
import { AddIcon } from '../../../../../../assets/icons'
import { InventoryProductContext } from '../../../../../../context/product/inventoryProduct'
import {
   DELETE_INVENTORY_PRODUCT_OPTION,
   UPDATE_INVENTORY_PRODUCT,
} from '../../../../../../graphql'
// styles
import {
   Grid,
   StyledLayout,
   StyledListing,
   StyledListingTile,
   StyledPanel,
   StyledTab,
   StyledTable,
   StyledTabs,
   StyledTabView,
   StyledWrapper,
} from './styled'

const address =
   'apps.online_store.views.forms.product.inventoryproduct.components.item.'

export default function Item({ state, openTunnel }) {
   const { t } = useTranslation()

   const { productDispatch } = React.useContext(InventoryProductContext)

   const [_state, _setState] = React.useState({
      view: 'pricing',
   })

   // Mutations
   const [deleteOption] = useMutation(DELETE_INVENTORY_PRODUCT_OPTION, {
      onCompleted: () => {
         toast.success('Option(s) deleted!')
      },
      onError: error => {
         console.log(error)
         toast.error('Could not delete!')
      },
   })
   const [updateProduct] = useMutation(UPDATE_INVENTORY_PRODUCT, {
      onCompleted: () => {
         toast.success('Item deleted!')
         const ids = state.inventoryProductOptions.map(op => op.id)
         deleteOption({
            variables: {
               id: { _in: ids },
            },
         })
      },
      onError: error => {
         console.log(error)
         toast.error('Error')
      },
   })

   // Handlers
   const addOption = () => {
      productDispatch({ type: 'UPDATING', payload: false })
      openTunnel(7)
   }
   const editOption = option => {
      productDispatch({ type: 'UPDATING', payload: true })
      productDispatch({ type: 'OPTION', payload: option })
      openTunnel(7)
   }
   const remove = option => {
      deleteOption({
         variables: {
            id: { _eq: option.id },
         },
      })
   }
   const deleteItem = () => {
      updateProduct({
         variables: {
            id: state.id,
            set: {
               sachetItemId: null,
               supplierItemId: null,
            },
         },
      })
   }

   return (
      <StyledWrapper>
         {state.sachetItem || state.supplierItem ? (
            <StyledLayout>
               <StyledListing>
                  <StyledListingTile active>
                     <h3>
                        {state.supplierItem?.name ||
                           state.sachetItem.bulkItem.supplierItem.name +
                              ' ' +
                              state.sachetItem.bulkItem.processingName}
                     </h3>
                     <span onClick={deleteItem}>
                        <DeleteIcon color="#fff" />
                     </span>
                  </StyledListingTile>
               </StyledListing>
               <StyledPanel>
                  <h2>
                     {state.supplierItem?.name ||
                        state.sachetItem.bulkItem.supplierItem.name +
                           ' ' +
                           state.sachetItem.bulkItem.processingName}
                  </h2>
                  <h5>
                     {t(address.concat('unit size'))}:{' '}
                     {state.supplierItem?.unitSize + state.supplierItem?.unit ||
                        state.sachetItem.unitSize + state.sachetItem.unit}
                  </h5>
                  <StyledTabs>
                     <StyledTab
                        onClick={() =>
                           _setState({ ..._state, view: 'pricing' })
                        }
                        active={_state.view === 'pricing'}
                     >
                        {t(address.concat('pricing'))}
                     </StyledTab>
                     <StyledTab
                        onClick={() =>
                           _setState({ ..._state, view: 'accompaniments' })
                        }
                        active={_state.view === 'accompaniments'}
                     >
                        {t(address.concat('accompaniments'))}
                     </StyledTab>
                  </StyledTabs>
                  <StyledTabView>
                     {_state.view === 'pricing' ? (
                        <React.Fragment>
                           <StyledTable>
                              <thead>
                                 <tr>
                                    <th>{t(address.concat('options'))}</th>
                                    <th>{t(address.concat('quantity'))}</th>
                                    <th>{t(address.concat('price'))}</th>
                                    <th>{t(address.concat('discount'))}</th>
                                    <th>
                                       {t(address.concat('discounted price'))}
                                    </th>
                                    <th></th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {state.inventoryProductOptions?.map(option => (
                                    <tr key={option.id}>
                                       <td>{option.label}</td>
                                       <td>{option.quantity}</td>
                                       <td>${option.price[0].value}</td>
                                       <td>{option.price[0].discount}%</td>
                                       <td>
                                          $
                                          {(
                                             parseFloat(option.price[0].value) -
                                             parseFloat(option.price[0].value) *
                                                (parseFloat(
                                                   option.price[0].discount
                                                ) /
                                                   100)
                                          ).toFixed(2) || ''}
                                       </td>
                                       <td>
                                          <Grid>
                                             <IconButton
                                                onClick={() =>
                                                   editOption(option)
                                                }
                                             >
                                                <EditIcon color="#00A7E1" />
                                             </IconButton>
                                             <IconButton
                                                onClick={() => remove(option)}
                                             >
                                                <DeleteIcon color="#FF5A52" />
                                             </IconButton>
                                          </Grid>
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </StyledTable>
                           <ComboButton type="ghost" onClick={addOption}>
                              <AddIcon />
                              {t(address.concat('add option'))}
                           </ComboButton>
                        </React.Fragment>
                     ) : (
                        <Accompaniments state={state} openTunnel={openTunnel} />
                     )}
                  </StyledTabView>
               </StyledPanel>
            </StyledLayout>
         ) : (
            <ButtonTile
               type="primary"
               size="lg"
               text={t(address.concat('add item'))}
               onClick={() => openTunnel(2)}
            />
         )}
      </StyledWrapper>
   )
}
