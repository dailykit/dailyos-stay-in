import React from 'react'
import { toast } from 'react-toastify'
import { useMutation } from '@apollo/react-hooks'
import {
   ButtonTile,
   Collapsible,
   Flex,
   Form,
   IconButton,
   Spacer,
   Text,
   TextButton,
   Tunnel,
   Tunnels,
   useTunnel,
} from '@dailykit/ui'

import { PRODUCT_OPTION } from '../../../../graphql'
import { logger } from '../../../../../../shared/utils'
import {
   DeleteIcon,
   EditIcon,
   PlusIcon,
} from '../../../../../../shared/assets/icons'
import { ProductContext } from '../../../../context/product'
import validator from '../validators'
import { ProductOptionTypeTunnel, ProductOptionItemTunnel } from './tunnels'

const ProductOptions = ({ productId, options }) => {
   const [tunnels, openTunnel, closeTunnel] = useTunnel(2)

   const { productDispatch } = React.useContext(ProductContext)

   const [createProductOption] = useMutation(PRODUCT_OPTION.CREATE, {
      onCompleted: () => {
         toast.success('Option created.')
      },
      onError: error => {
         toast.error('Something went wrong!')
         logger(error)
      },
   })

   const handleAddOption = () => {
      createProductOption({
         variables: {
            object: {
               productId,
            },
         },
      })
   }

   const handleAddOptionItem = optionId => {
      productDispatch({
         type: 'OPTION',
         payload: optionId,
      })
      openTunnel(1)
   }

   return (
      <>
         <Tunnels tunnels={tunnels}>
            <Tunnel layer={1}>
               <ProductOptionTypeTunnel
                  openTunnel={openTunnel}
                  closeTunnel={closeTunnel}
               />
            </Tunnel>
            <Tunnel layer={2}>
               <ProductOptionItemTunnel closeTunnel={closeTunnel} />
            </Tunnel>
         </Tunnels>
         {options.length && (
            <Flex margin="0 0 32px 0">
               {options.map(option => (
                  <Option
                     key={option.id}
                     option={option}
                     handleAddOptionItem={() => handleAddOptionItem(option.id)}
                  />
               ))}
            </Flex>
         )}
         <ButtonTile
            type="secondary"
            text="Add Option"
            onClick={handleAddOption}
         />
      </>
   )
}

export default ProductOptions

const Option = ({ option, handleAddOptionItem }) => {
   const [history, setHistory] = React.useState({
      ...option,
   })

   React.useEffect(() => {
      setHistory({ ...option })
   }, [option.label, option.price, option.discount, option.quantity])

   const [label, setLabel] = React.useState({
      value: option.label || '',
      meta: {
         isTouched: false,
         isValid: true,
         errors: [],
      },
   })
   const [quantity, setQuantity] = React.useState({
      value: option.quantity,
      meta: {
         isTouched: false,
         isValid: true,
         errors: [],
      },
   })
   const [price, setPrice] = React.useState({
      value: option.price,
      meta: {
         isTouched: false,
         isValid: true,
         errors: [],
      },
   })
   const [discount, setDiscount] = React.useState({
      value: option.discount,
      meta: {
         isTouched: false,
         isValid: true,
         errors: [],
      },
   })

   const [updateProductOption] = useMutation(PRODUCT_OPTION.UPDATE, {
      onCompleted: () => {
         toast.success('Option updated!')
      },
      onError: error => {
         toast.error('Something went wrong!')
         logger(error)
      },
   })

   const handleDeleteOptionItem = () => {
      updateProductOption({
         variables: {
            id: option.id,
            _set: {
               simpleRecipeYieldId: null,
               supplierItemId: null,
               sachetItemId: null,
            },
         },
      })
   }

   const isActuallyUpdated = (field, value) => {
      if (history[field] !== value) {
         return true
      }
      return false
   }

   const handleBlur = field => {
      switch (field) {
         case 'label': {
            const val = label.value.trim()
            const { isValid, errors } = validator.label(val)
            if (isValid && isActuallyUpdated(field, val)) {
               updateProductOption({
                  variables: {
                     id: option.id,
                     _set: {
                        label: val,
                     },
                  },
               })
            }
            setLabel({
               ...label,
               meta: {
                  isTouched: true,
                  isValid,
                  errors,
               },
            })
            return
         }
         case 'price': {
            const val = price.value
            const { isValid, errors } = validator.label(val)
            if (isValid && isActuallyUpdated(field, val)) {
               updateProductOption({
                  variables: {
                     id: option.id,
                     _set: {
                        price: val,
                     },
                  },
               })
            }
            setPrice({
               ...price,
               meta: {
                  isTouched: true,
                  isValid,
                  errors,
               },
            })
            return
         }
         case 'discount': {
            const val = discount.value
            const { isValid, errors } = validator.discount(val)
            if (isValid && isActuallyUpdated(field, val)) {
               updateProductOption({
                  variables: {
                     id: option.id,
                     _set: {
                        discount: val,
                     },
                  },
               })
            }
            setDiscount({
               ...discount,
               meta: {
                  isTouched: true,
                  isValid,
                  errors,
               },
            })
            return
         }
         case 'quantity': {
            const val = quantity.value
            const { isValid, errors } = validator.quantity(val)
            if (isValid && isActuallyUpdated(field, val)) {
               updateProductOption({
                  variables: {
                     id: option.id,
                     _set: {
                        quantity: val,
                     },
                  },
               })
            }
            setQuantity({
               ...quantity,
               meta: {
                  isTouched: true,
                  isValid,
                  errors,
               },
            })
            return
         }
         default:
            return null
      }
   }

   const renderLinkedItem = () => {
      const renderItemName = () => {
         if (option.simpleRecipeYield) {
            return `${option.simpleRecipeYield.simpleRecipe.name} - ${option.simpleRecipeYield.yield.serving} serving`
         }
         if (option.supplierItem) {
            return `${option.supplierItem.name} - ${option.supplierItem.unitSize} ${option.supplierItem.unit}`
         }
         if (option.sachetItem) {
            return `${option.sachetItem.bulkItem.supplierItem.name} ${option.sachetItem.bulkItem.processingName} - ${option.sachetItem.unitSize} ${option.sachetItem.unit}`
         }
      }

      return (
         <>
            {option.simpleRecipeYield ||
            option.supplierItem ||
            option.sachetItem ? (
               <Flex container alignItems="center">
                  <Text as="title">{renderItemName()}</Text>
                  <Spacer xAxis size="16px" />
                  <IconButton type="ghost" onClick={handleAddOptionItem}>
                     <EditIcon color="#00A7E1" />
                  </IconButton>
                  <Spacer xAxis size="8px" />
                  <IconButton type="ghost" onClick={handleDeleteOptionItem}>
                     <DeleteIcon color="#FF5A52" />
                  </IconButton>
               </Flex>
            ) : (
               <IconButton type="ghost" onClick={handleAddOptionItem}>
                  <PlusIcon />
               </IconButton>
            )}
         </>
      )
   }

   const renderHead = () => {
      return (
         <Flex container alignItems="center" width="100%">
            <Flex>
               <Form.Label htmlFor={`label-${option.id}`} title="label">
                  Label
               </Form.Label>
               <Form.Text
                  id={`label-${option.id}`}
                  name={`label-${option.id}`}
                  onBlur={() => handleBlur('label')}
                  onChange={e => setLabel({ ...label, value: e.target.value })}
                  value={label.value}
                  placeholder="Enter label"
                  hasError={label.meta.isTouched && !label.meta.isValid}
               />
            </Flex>
            <Spacer xAxis size="32px" />
            <Flex maxWidth="100px">
               <Form.Label htmlFor={`quantity-${option.id}`} title="quantity">
                  Quantity
               </Form.Label>
               <Form.Number
                  id={`quantity-${option.id}`}
                  name={`quantity-${option.id}`}
                  onBlur={() => handleBlur('quantity')}
                  onChange={e =>
                     setQuantity({ ...quantity, value: e.target.value })
                  }
                  value={quantity.value}
                  placeholder="Enter quantity"
                  hasError={quantity.meta.isTouched && !quantity.meta.isValid}
               />
            </Flex>
            <Spacer xAxis size="32px" />
            <Flex maxWidth="100px">
               <Form.Label htmlFor={`price-${option.id}`} title="price">
                  Price
               </Form.Label>
               <Form.Number
                  id={`price-${option.id}`}
                  name={`price-${option.id}`}
                  onBlur={() => handleBlur('price')}
                  onChange={e => setPrice({ ...price, value: e.target.value })}
                  value={price.value}
                  placeholder="Enter price"
                  hasError={price.meta.isTouched && !price.meta.isValid}
               />
            </Flex>
            <Spacer xAxis size="32px" />
            <Flex maxWidth="100px">
               <Form.Label htmlFor={`discount-${option.id}`} title="discount">
                  Discount
               </Form.Label>
               <Form.Number
                  id={`discount-${option.id}`}
                  name={`discount-${option.id}`}
                  onBlur={() => handleBlur('discount')}
                  onChange={e =>
                     setDiscount({ ...discount, value: e.target.value })
                  }
                  value={discount.value}
                  placeholder="Enter discount"
                  hasError={discount.meta.isTouched && !discount.meta.isValid}
               />
            </Flex>
            <Spacer xAxis size="64px" />
            {renderLinkedItem()}
         </Flex>
      )
   }

   const renderBody = () => {
      return <p>Body</p>
   }

   return <Collapsible isDraggable head={renderHead()} body={renderBody()} />
}
