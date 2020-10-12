import React from 'react'
import { useSubscription, useMutation } from '@apollo/react-hooks'
import { Loader, Text, TextButton } from '@dailykit/ui'
import { reactFormatter, ReactTabulator } from '@dailykit/react-tabulator'
import { toast } from 'react-toastify'

import { useTranslation } from 'react-i18next'
import { DeleteIcon } from '../../../../../../../shared/assets/icons'
import { useTabs } from '../../../../../context'
import {
   S_INVENTORY_PRODUCTS,
   DELETE_INVENTORY_PRODUCTS,
} from '../../../../../graphql'
import tableOptions from '../../../tableOption'

const address = 'apps.online_store.views.listings.productslisting.'

const InventoryProducts = () => {
   const { t } = useTranslation()
   const { addTab } = useTabs()

   const tableRef = React.useRef()

   const {
      data: { inventoryProducts = [] } = {},
      loading,
      error,
   } = useSubscription(S_INVENTORY_PRODUCTS)

   const [deleteProducts] = useMutation(DELETE_INVENTORY_PRODUCTS, {
      onCompleted: () => {
         toast.success('Product deleted!')
      },
      onError: err => {
         console.log(err)
         toast.error('Could not delete!')
      },
   })

   // Handler
   const deleteHandler = (e, product) => {
      e.stopPropagation()
      if (
         window.confirm(
            `Are you sure you want to delete product - ${product.name}?`
         )
      ) {
         deleteProducts({
            variables: {
               ids: [product.id],
            },
         })
      }
   }

   const columns = [
      {
         title: t(address.concat('product name')),
         field: 'name',
         headerFilter: true,
         widthGrow: 2,
      },

      {
         title: 'Actions',
         headerFilter: false,
         headerSort: false,
         hozAlign: 'center',
         cellClick: (e, cell) => {
            e.stopPropagation()
            deleteHandler(e, cell._cell.row.data)
         },
         formatter: reactFormatter(<DeleteIngredient />),
         width: 150,
      },
   ]

   const rowClick = (e, row) => {
      const { id, name } = row._row.data
      addTab(name, `/recipe/inventory-products/${id}`)
   }

   if (loading) return <Loader />
   if (error) {
      console.log(error)
      return <Text as="p">Error: Could not fetch products!</Text>
   }

   return (
      <div>
         <TextButton
            type="outline"
            onClick={() => tableRef.current.table.clearHeaderFilter()}
            style={{ marginBottom: '20px' }}
         >
            Clear Filters
         </TextButton>
         <ReactTabulator
            ref={tableRef}
            columns={columns}
            data={inventoryProducts}
            rowClick={rowClick}
            options={tableOptions}
         />
      </div>
   )
}

function DeleteIngredient() {
   return <DeleteIcon color="#FF5A52" />
}

export default InventoryProducts
