import { useMutation, useSubscription } from '@apollo/react-hooks'
import { ComboButton, Loader, TextButton, Flex, IconButton } from '@dailykit/ui'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { reactFormatter, ReactTabulator } from '@dailykit/react-tabulator'
import { toast } from 'react-toastify'

import DeleteIcon from '../../../../../shared/assets/icons/Delete'
import { logger, randomSuffix } from '../../../../../shared/utils/index'
import { AddIcon } from '../../../assets/icons'
import {
   CREATE_SUPPLIER,
   DELETE_SUPPLIER,
   ALL_SUPPLIERS_SUBSCRIPTION,
} from '../../../graphql'
import { StyledHeader, StyledWrapper } from '../styled'
import tableOptions from '../tableOption'
import { useTabs } from '../../../context'
import {
   GENERAL_ERROR_MESSAGE,
   SUPPLIER_CANNOT_BE_DELETED,
} from '../../../constants/errorMessages'
import {
   CONFIRM_DELETE_SUPPLIER,
   SUPPLIER_DELETED,
} from '../../../constants/successMessages'
import { Tooltip } from '../../../../../shared/components/Tooltip'
import { useTooltip } from '../../../../../shared/providers'

const address = 'apps.inventory.views.listings.supplier.'

export default function SupplierListing() {
   const { t } = useTranslation()
   const { addTab } = useTabs()

   const { tooltip } = useTooltip()

   const {
      loading: listLoading,
      error,
      data: { suppliers = [] } = {},
   } = useSubscription(ALL_SUPPLIERS_SUBSCRIPTION)

   if (error) {
      logger(error)
      toast.error(GENERAL_ERROR_MESSAGE)
   }

   const [createSupplier] = useMutation(CREATE_SUPPLIER, {
      onCompleted: input => {
         const supplierData = input.createSupplier.returning[0]
         toast.success('Supplier Added!')
         addTab(supplierData.name, `/inventory/suppliers/${supplierData.id}`)
      },
      onError: error => {
         logger(error)
         toast.error(GENERAL_ERROR_MESSAGE)
      },
   })

   const [deleteSupplier] = useMutation(DELETE_SUPPLIER, {
      onCompleted: () => {
         toast.info(SUPPLIER_DELETED)
      },
      onError: error => {
         logger(error)
         toast.error(SUPPLIER_CANNOT_BE_DELETED)
      },
   })

   const createSupplierHandler = () => {
      // create supplier in DB
      const name = `supplier-${randomSuffix()}`
      createSupplier({
         variables: {
            object: {
               name,
            },
         },
      })
   }

   const tableRef = React.useRef()

   const openForm = (_, cell) => {
      const { id, name } = cell.getData()
      addTab(name, `/inventory/suppliers/${id}`)
   }

   const columns = [
      {
         title: 'Name',
         field: 'name',
         headerFilter: true,
         cellClick: openForm,
         headerTooltip: col => {
            const identifier = 'suppliers_listings_supplier_name'
            return tooltip(identifier)?.description || col.getDefinition().title
         },
      },
      {
         title: 'Person of Contact',
         field: 'contactPerson',
         headerFilter: false,
         headerSort: false,
         hozAlign: 'left',
         formatter: reactFormatter(<ContactPerson />),
         headerTooltip: col => {
            const identifier = 'suppliers_listings_contact_person'
            return tooltip(identifier)?.description || col.getDefinition().title
         },
      },
      {
         title: 'Available',
         field: 'available',
         headerFilter: false,
         formatter: 'tickCross',
         hozAlign: 'center',
         cssClass: 'center-text',
         width: 120,
         headerTooltip: col => {
            const identifier = 'suppliers_listings_supplier_availability'
            return tooltip(identifier)?.description || col.getDefinition().title
         },
      },
      {
         title: 'Actions',
         headerFilter: false,
         headerSort: false,
         hozAlign: 'center',
         cssClass: 'center-text',
         formatter: reactFormatter(
            <DeleteSupplier deleteSupplier={deleteSupplier} />
         ),
         width: 100,
      },
   ]

   if (listLoading) return <Loader />

   return (
      <>
         <StyledWrapper>
            <StyledHeader>
               <Flex container>
                  <h1>{t(address.concat('suppliers'))}</h1>
                  <Tooltip identifier="suppliers_listings_heading" />
               </Flex>
               <Flex
                  container
                  alignItems="center"
                  justifyContent="space-between"
               >
                  <TextButton
                     type="outline"
                     onClick={() => tableRef.current.table.clearHeaderFilter()}
                  >
                     Clear Filters
                  </TextButton>
                  <span style={{ width: '10px' }} />
                  <ComboButton type="solid" onClick={createSupplierHandler}>
                     <AddIcon color="#fff" size={24} /> Add Supplier
                  </ComboButton>
               </Flex>
            </StyledHeader>
            <br />

            <ReactTabulator
               ref={tableRef}
               columns={columns}
               data={suppliers}
               options={tableOptions}
            />
         </StyledWrapper>
      </>
   )
}

function DeleteSupplier({ deleteSupplier, cell }) {
   const handleDelete = () => {
      if (window.confirm(CONFIRM_DELETE_SUPPLIER)) {
         const { id } = cell.getData()
         deleteSupplier({
            variables: { id },
         })
      }
   }

   return (
      <IconButton type="ghost" onClick={handleDelete}>
         <DeleteIcon color="#FF5A52" />
      </IconButton>
   )
}

function ContactPerson({
   cell: {
      _cell: { value },
   },
}) {
   if (value && value.firstName && value.lastName && value.phoneNumber)
      return (
         <>{`${value.firstName} ${value.lastName} (${value.phoneNumber})`}</>
      )

   return 'NA'
}
