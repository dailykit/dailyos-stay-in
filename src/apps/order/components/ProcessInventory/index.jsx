import React from 'react'
import { toast } from 'react-toastify'
import { Flex, Text } from '@dailykit/ui'
import { useMutation, useSubscription } from '@apollo/react-hooks'

import { useOrder } from '../../context/order'
import { logger } from '../../../../shared/utils'
import { QUERIES, UPDATE_INVENTORY_PRODUCT } from '../../graphql'
import {
   Tooltip,
   ErrorState,
   InlineLoader,
} from '../../../../shared/components'
import {
   Wrapper,
   StyledStat,
   StyledMode,
   StyledHeader,
   StyledButton,
   StyledSection,
} from './styled'

export const ProcessInventory = () => {
   const {
      state: { current_view, inventory },
      switchView,
   } = useOrder()
   const [updateProduct] = useMutation(UPDATE_INVENTORY_PRODUCT)

   const {
      loading,
      error,
      data: { orderInventoryProduct: product = {} } = {},
   } = useSubscription(QUERIES.ORDER.INVENTORY.ONE, {
      variables: {
         id: inventory.id,
      },
   })

   if (!inventory.id) {
      return (
         <Wrapper>
            <StyledMode>
               <Flex container alignItems="center">
                  <label htmlFor="mode">Mode</label>
                  <Tooltip identifier="left_panel_mode" />
               </Flex>
               <select
                  id="mode"
                  name="mode"
                  value={current_view}
                  onChange={e => switchView(e.target.value)}
               >
                  <option value="SUMMARY">Summary</option>
                  <option value="SACHET_ITEM">Process Sachet</option>
                  <option value="INVENTORY">Inventory</option>
                  <option value="READYTOEAT">Ready to Eat</option>
               </select>
            </StyledMode>
            <Text as="h3">No product selected!</Text>
         </Wrapper>
      )
   }
   if (loading || !product) return <InlineLoader />
   if (error) {
      logger(error)
      toast.error('Failed to fetch inventory product details!')
      return (
         <Wrapper>
            <StyledMode>
               <Flex container alignItems="center">
                  <label htmlFor="mode">Mode</label>
                  <Tooltip identifier="left_panel_mode" />
               </Flex>
               <select
                  id="mode"
                  name="mode"
                  value={current_view}
                  onChange={e => switchView(e.target.value)}
               >
                  <option value="SUMMARY">Summary</option>
                  <option value="SACHET_ITEM">Process Sachet</option>
                  <option value="INVENTORY">Inventory</option>
                  <option value="READYTOEAT">Ready to Eat</option>
               </select>
            </StyledMode>
            <ErrorState message="Failed to fetch inventory product details!" />
         </Wrapper>
      )
   }

   return (
      <Wrapper>
         <StyledMode>
            <Flex container alignItems="center">
               <label htmlFor="mode">Mode</label>
               <Tooltip identifier="left_panel_mode" />
            </Flex>
            <select
               id="mode"
               name="mode"
               value={current_view}
               onChange={e => switchView(e.target.value)}
            >
               <option value="SUMMARY">Summary</option>
               <option value="SACHET_ITEM">Process Sachet</option>
               <option value="INVENTORY">Inventory</option>
               <option value="READYTOEAT">Ready to Eat</option>
            </select>
         </StyledMode>
         <StyledHeader>
            <h3>{productTitle(product)}</h3>
         </StyledHeader>
         <main>
            <StyledSection>
               <span>Supplier</span>
               <span>{supplierName(product)}</span>
            </StyledSection>
            <StyledSection>
               <span>Supplier Item</span>
               <span>{supplierItemName(product)}</span>
            </StyledSection>
            <StyledStat status={product.assemblyStatus}>
               <span>Assembly</span>
               <span>{product.assemblyStatus}</span>
            </StyledStat>
            <StyledButton
               type="button"
               disabled={product.assemblyStatus === 'COMPLETED'}
               onClick={() =>
                  updateProduct({
                     variables: {
                        id: inventory.id,
                        _set: { assemblyStatus: 'COMPLETED' },
                     },
                  })
               }
            >
               {product.assemblyStatus === 'COMPLETED'
                  ? 'Packed'
                  : 'Mark Packed'}
            </StyledButton>
            <StyledButton
               type="button"
               disabled={product.isAssembled}
               onClick={() =>
                  updateProduct({
                     variables: {
                        id: inventory.id,
                        _set: { isAssembled: true },
                     },
                  })
               }
            >
               {product.isAssembled ? 'Assembled' : 'Mark Assembled'}
            </StyledButton>
         </main>
      </Wrapper>
   )
}

const productTitle = inventory => {
   let name = ''
   if (inventory?.inventoryProductId) {
      name += inventory?.inventoryProduct?.name
   }
   if (inventory?.comboProductId) {
      name += ` - ${inventory?.comboProduct?.name}`
   }
   if (inventory?.comboProductComponentId) {
      name += ` (${inventory?.comboProductComponent?.label})`
   }
   return name
}

const supplierName = product => {
   let name = ''
   if (product.inventoryProduct?.supplierItemId) {
      if (product.inventoryProduct?.supplierItemId) {
         if (product.inventoryProduct?.supplierItem.supplierId) {
            name = product.inventoryProduct?.supplierItem.supplier?.name
         }
      }
   } else if (product.inventoryProduct?.sachetItemId) {
      if (product.inventoryProduct?.sachetItem?.bulkItemId) {
         if (product.inventoryProduct?.sachetItem?.bulkItem?.supplierId) {
            name =
               product.inventoryProduct?.sachetItem?.bulkItem?.supplier?.name
         }
      }
   }
   return name || 'N/A'
}

const supplierItemName = product => {
   let name = ''
   if (product.inventoryProduct?.supplierItemId) {
      if (product.inventoryProduct?.supplierItemId) {
         name =
            product.inventoryProduct?.supplierItem?.name +
            ` - ${product.inventoryProduct?.supplierItem?.unitSize}${product.inventoryProduct?.supplierItem?.unit}`
      }
   } else if (product.inventoryProduct?.sachetItemId) {
      if (product.inventoryProduct?.sachetItem?.bulkItemId) {
         name =
            product.inventoryProduct?.sachetItem?.name +
            ` - ${product.inventoryProduct?.sachetItem?.unitSize}${product.inventoryProduct?.sachetItem?.unit}`
      }
   }
   return name || 'N/A'
}
