import React from 'react'
import { useMutation, useSubscription } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import {
   ButtonTile,
   Flex,
   Select,
   Text,
   Tunnel,
   Tunnels,
   useTunnel,
   PlusIcon,
   IconButton,
   ContextualMenu,
   Context,
   Dropdown,
   Form,
} from '@dailykit/ui'
import { toast } from 'react-toastify'
import {
   Serving,
   CalCount,
   FoodCost,
   Yield,
   ChefPay,
} from '../../../../../assets/icons'
import {
   StyledCardEven,
   Heading,
   StyledCardIngredient,
   SatchetCard,
} from './styles'
import { Tooltip, InlineLoader } from '../../../../../../../shared/components'
import { logger } from '../../../../../../../shared/utils'
import {
   DELETE_SIMPLE_RECIPE_YIELD,
   S_PROCESSINGS,
   UPDATE_SIMPLE_RECIPE_INGREDIENT_PROCESSING,
   CREATE_PROCESSINGS,
   UPSERT_MASTER_PROCESSING,
   S_SACHETS,
   UPSERT_MASTER_UNIT,
   CREATE_SACHET,
   UPSERT_SIMPLE_RECIPE_YIELD_SACHET,
   UPDATE_SIMPLE_RECIPE_YIELD_SACHET,
} from '../../../../../graphql'
import { ServingsTunnel, IngredientsTunnel } from '../../tunnels'
import { RecipeContext } from '../../../../../context/recipe'

const Servings = ({ state }) => {
   const [tunnels, openTunnel, closeTunnel] = useTunnel(1)
   const { recipeState } = React.useContext(RecipeContext)
   const [ingredientProcessings, setIngredientProcessings] = React.useState([])
   let [search] = React.useState('')
   let [ingredientStateId, setingredientStateId] = React.useState(0)

   const [
      ingredientsTunnel,
      openingredientTunnel,
      closeingredientTunnel,
   ] = useTunnel(2)

   const { loading } = useSubscription(S_PROCESSINGS, {
      variables: {
         where: {
            isArchived: { _eq: false },
         },
      },
      onSubscriptionData: data => {
         const processings = data.subscriptionData.data.ingredientProcessings
         setIngredientProcessings(processings)
      },
   })

   const [sachets, setSachets] = React.useState([])
   let [slipname, setslipname] = React.useState('')

   // Query
   const { loadingSachets } = useSubscription(S_SACHETS, {
      variables: {
         where: {
            isArchived: { _eq: false },
         },
      },
      onSubscriptionData: data => {
         const updatedSachets = data.subscriptionData.data.ingredientSachets.map(
            sachet => ({
               ...sachet,
               title: `${sachet.quantity} ${sachet.unit}`,
            })
         )

         setSachets([...updatedSachets])
      },
   })

   // Mutation
   const [deleteYield] = useMutation(DELETE_SIMPLE_RECIPE_YIELD, {
      onCompleted: () => {
         toast.success('Deleted!')
      },
      onError: error => {
         toast.error('Something went wrong!')
         logger(error)
      },
   })

   const [updateSimpleRecipeIngredientProcessing] = useMutation(
      UPDATE_SIMPLE_RECIPE_INGREDIENT_PROCESSING,
      {
         onCompleted: () => {
            toast.success('Processing added!')
         },
         onError: error => {
            toast.error('Something went wrong!')
            logger(error)
         },
      }
   )

   // Handlers
   const remove = serving => {
      const confirmed = window.confirm(
         `Are you sure you want to delete serving - ${serving.yield.serving}?`
      )
      if (confirmed)
         deleteYield({
            variables: {
               id: serving.id,
            },
         })
   }

   const [upsertMasterProcessing] = useMutation(UPSERT_MASTER_PROCESSING, {
      onCompleted: data => {
         createProcessing({
            variables: {
               procs: [
                  {
                     ingredientId: ingredientStateId,
                     processingName:
                        data.createMasterProcessing.returning[0].name,
                  },
               ],
            },
         })
      },
      onError: error => {
         toast.error('Something went wrong!')
         logger(error)
      },
   })

   const [createProcessing] = useMutation(CREATE_PROCESSINGS, {
      onCompleted: data => {
         //console.log(data)
         const processing = {
            id: data.createIngredientProcessing.returning[0].id,
            title: data.createIngredientProcessing.returning[0].processingName,
         }
         // add(processing)
      },
      onError: error => {
         toast.error('Something went wrong!')
         logger(error)
      },
   })

   const [upsertMasterUnit] = useMutation(UPSERT_MASTER_UNIT, {
      onError: error => {
         toast.error('Something went wrong!')
         logger(error)
      },
   })
   const [createSachet] = useMutation(CREATE_SACHET, {
      onError: error => {
         toast.error('Something went wrong!')
         logger(error)
      },
   })

   const [upsertRecipeYieldSachet] = useMutation(
      UPSERT_SIMPLE_RECIPE_YIELD_SACHET,
      {
         onCompleted: () => {
            toast.success('Sachet added!')
            closeTunnel(3)
         },
         onError: error => {
            toast.error('Something went wrong!')
            logger(error)
         },
      }
   )

   const options =
      state.simpleRecipeYields?.map((option, index) => {
         console.log(option, 'Adrish option')

         return (
            <th>
               <StyledCardEven index={index} id={option.id}>
                  <Serving />
                  <div
                     style={{
                        paddingLeft: '5px',
                        display: 'inline-block',
                        width: '86px',
                     }}
                  >
                     {option.yield.serving}
                  </div>
                  <div style={{ textAlign: 'right', display: 'inline-block' }}>
                     <ContextualMenu
                        style={{ margin: '0px', padding: '0px', width: '10px' }}
                     >
                        <Context
                           title="Delete"
                           handleClick={() => remove(option)}
                        ></Context>
                     </ContextualMenu>
                  </div>
                  <br />
                  <p
                     style={{
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: '12px',
                        lineHeight: '10px',
                     }}
                  >
                     {' '}
                     {option.yield.label}{' '}
                  </p>
                  <div
                     style={{
                        display: 'inline-block',
                        width: '36px',
                        height: '16px',
                        background: '#F6C338',
                        borderRadius: '40px',
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fontSize: '11px',
                        lineHeight: '16px',
                        margin: '0px 2px 0px 0px',
                        letterSpacing: '0.32px',
                        padding: '1px 0px 2.5px 5px',
                        color: '#FFFFFF',
                     }}
                  >
                     <CalCount /> 2%
                  </div>
                  <div
                     style={{
                        display: 'inline-block',
                        width: '36px',
                        height: '16px',
                        background: '#8AC03B',
                        borderRadius: '40px',
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fontSize: '11px',
                        lineHeight: '16px',
                        margin: '0px 2px 0px 2px',
                        letterSpacing: '0.32px',
                        padding: '1px 5px 2.5px 5px',
                        color: '#FFFFFF',
                     }}
                  >
                     <FoodCost /> 2$
                  </div>
                  <div
                     style={{
                        display: 'inline-block',
                        width: '44px',
                        height: '16px',
                        background: '#555B6E',
                        borderRadius: '40px',
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fontSize: '11px',
                        lineHeight: '16px',
                        margin: '0px 0px 0px 2px',
                        letterSpacing: '0.32px',
                        padding: '1px 5px 2.5px 5px',
                        color: '#FFFFFF',
                     }}
                  >
                     <Yield /> 2kg
                  </div>
               </StyledCardEven>
            </th>
         )
      }) || []

   const ingredients_options =
      state.simpleRecipeIngredients?.map((option, index) => {
         let dropDownReadOnly = true
         let sachetDisabled = false
         let optionsWithoutDescription = []
         let sachetOptions = []

         if (option.processing == null) {
            dropDownReadOnly = false
            sachetDisabled = true
         }
         const selectedOption = processing => {
            updateSimpleRecipeIngredientProcessing({
               variables: {
                  id: option.id,
                  _set: {
                     processingId: processing.id,
                     simpleRecipeId: state.id,
                  },
               },
            })
         }
         const searchedOption = searchedProcessing => {
            search = searchedProcessing

            //console.log(search, 'Adrish Search')
         }

         const quickCreateProcessing = () => {
            let processingName =
               search.slice(0, 1).toUpperCase() + search.slice(1)
            setingredientStateId(option.ingredient.id)
            //console.log(ingredientStateId, 'ingredientStateId')
            upsertMasterProcessing({
               variables: {
                  name: processingName,
               },
            })
         }

         let ProcessingOptions = []
         return (
            <tr>
               <td>
                  <StyledCardIngredient>
                     <div
                        style={{
                           display: 'inline-block',
                           width: '27px',
                           height: '27px',
                           borderRadius: '50%',
                           background: '#F4F4F4',
                           margin: '0px 18px 0px 0px',
                           fontFamily: 'Roboto',
                           fontStyle: 'normal',
                           fontWeight: 'bold',
                           fontSize: '12px',
                           lineHeight: '16px',
                           color: '#919699',
                           letterSpacing: '0.32px',
                           padding: '7px 0px 0px 0px',
                           textAlign: 'center',
                        }}
                     >
                        {index + 1}
                     </div>

                     <Link to="#">{option.ingredient.name}</Link>
                     {console.log(ingredientProcessings, "Adrish ingredientProcessings")}
                     {ingredientProcessings.map((item, index) => {
                        if (option.ingredient.id == item.ingredientId) {
                           
                           ProcessingOptions.push({
                              id: item.id,
                              title: item.title,
                           })
                        }
                        optionsWithoutDescription = ProcessingOptions
                     })}
                    
                     <div style={{ padding: '0px 0px 12px 45px' }}>
                        <Dropdown
                           type="single"
                           variant="revamp"
                           defaultOption={option.processing}
                           addOption={quickCreateProcessing}
                           options={ProcessingOptions}
                           searchedOption={searchedOption}
                           selectedOption={selectedOption}
                           readOnly={dropDownReadOnly}
                           typeName="processing"
                        />
                     </div>
                    
                     <div
                        style={{
                           display: 'inline-block',
                           width: '99px',
                           height: '18px',
                           background: '#F6C338',
                           borderRadius: '40px',
                           fontFamily: 'Roboto',
                           fontStyle: 'normal',
                           fontWeight: 'bold',
                           fontSize: '11px',
                           lineHeight: '16px',
                           margin: '0px 2px 0px 45px',
                           letterSpacing: '0.32px',
                           padding: '1px 0px 2.5px 5px',
                           color: '#FFFFFF',
                        }}
                     >
                        <CalCount /> 2% per saving
                     </div>
                     <div
                        style={{
                           display: 'inline-block',
                           width: '36px',
                           height: '16px',
                           background: '#FF5A52',
                           borderRadius: '40px',
                           fontFamily: 'Roboto',
                           fontStyle: 'normal',
                           fontWeight: 'bold',
                           fontSize: '11px',
                           lineHeight: '16px',
                           margin: '0px 2px 0px 0px',
                           letterSpacing: '0.32px',
                           padding: '1px 0px 2.5px 5px',
                           color: '#FFFFFF',
                        }}
                     >
                        <ChefPay /> 2$
                     </div>
                  </StyledCardIngredient>
               </td>
               {state.simpleRecipeYields?.map((object, index) => {
                  sachetOptions = []
                  let search = ''
                  let loader = false
                  let defaultslipName = ''
                  let onChange = false
                  sachets.map((item, index) => {
                     if (sachetDisabled == false) {
                        //console.log(option.processing.id, item.processingId, "Adrish Processing idss")
                        if (
                           option.processing.id ==
                              item.ingredientProcessingId &&
                           option.ingredient.id == item.ingredient.id
                        ) {
                           //console.log(item.id,"Adrish sachet idss")
                           loader = true
                           sachetOptions.push({
                              id: item.id,
                              title: item.title,
                           })
                        }
                     }
                  })
                  let defaultSachetOption = {}
                  option.linkedSachets.map((item, index) => {
                     if (item.simpleRecipeYield.id == object.id) {
                        loader = true
                        defaultslipName = item.slipName

                        defaultSachetOption = {
                           id: item.ingredientSachet.id,
                           title: `${defaultSachetOption.title} ${item.ingredientSachet.quantity}`,
                        }
                     }
                     return ''
                  })

                  const quickCreateSachet = async () => {
                     if (!search.includes(' '))
                        return toast.error(
                           'Quantity and Unit should be space separated!'
                        )
                     const [quantity, unit] = search.trim().split(' ')
                     if (quantity && unit) {
                        await upsertMasterUnit({
                           variables: {
                              name: unit,
                           },
                        })
                        createSachet({
                           variables: {
                              objects: [
                                 {
                                    ingredientId: option.ingredient.id,
                                    ingredientProcessingId:
                                       option.processing.id,
                                    quantity: +quantity,
                                    unit,
                                    tracking: false,
                                 },
                              ],
                           },
                        })
                     } else {
                        toast.error('Enter a valid quantity and unit!')
                     }
                  }
                  const selectedSachetOption = sachet => {
                     upsertRecipeYieldSachet({
                        variables: {
                           yieldId: object.id,
                           ingredientProcessingRecordId: option.id,
                           ingredientSachetId: sachet.id,
                           slipName: option.ingredient.name,
                        },
                     })
                  }
                  const searchedSachetOption = searchedSachet => {
                     search = searchedSachet

                     //console.log(search, 'Adrish Search')
                  }
                  const setName = typedName => {
                     setslipname(typedName)
                     console.log(typedName)
                  }
                  return(
                     <td>
                     {loader == false || sachetOptions.length > 0 ? (
                        <SatchetCard index={index}>
                           <Dropdown
                              disabled={sachetDisabled}
                              options={sachetOptions}
                              defaultOption={defaultSachetOption}
                              addOption={quickCreateSachet}
                              searchedOption={searchedSachetOption}
                              selectedOption={selectedSachetOption}
                              type="single"
                              variant="revamp"
                              typeName="sachet"
                           />
                           <div
                              style={{
                                 width: '181px',
                                 padding: '0px 0px 0px 0px',
                              }}
                           >
                              {option.processing == null ? (
                                 <></>
                              ) : (
                                 <SachetDetails
                                    yieldId={object.id}
                                    ingredientProcessingRecordId={option.id}
                                    slipName={defaultslipName}
                                 />
                              )}
                           </div>
                        </SatchetCard>
                     ) : (
                        <SatchetCard>
                           <Skeleton />
                        </SatchetCard>
                     )}
                  </td>
               
                  )
               })}

            </tr>
         )
      }) || []

   return (
      <>
         <Tunnels tunnels={tunnels}>
            <Tunnel layer={1} size="sm">
               <ServingsTunnel state={state} closeTunnel={closeTunnel} />
            </Tunnel>
         </Tunnels>
         <Tunnels tunnels={ingredientsTunnel}>
            <Tunnel layer={1} size="sm">
               <IngredientsTunnel
                  state={state}
                  closeTunnel={closeingredientTunnel}
               />
            </Tunnel>
         </Tunnels>
         <Flex container alignItems="center">
            <Heading>Servings & Ingredients</Heading>
            <Tooltip identifier="recipe_servings" />
         </Flex>

         {options.length ? (
            <>
               <table style={{ textAlign: 'left' }}>
                  <tr>
                     <th>
                        <IconButton
                           variant="secondary"
                           onClick={() => {
                              openTunnel(1)
                           }}
                           style={{
                              display: 'inline-block',
                              width: '226px',
                              height: '74px',
                              marginTop: '0px',
                              paddingTop: '0px',
                           }}
                           type="solid"
                        >
                           <PlusIcon color="#367BF5" />
                        </IconButton>
                     </th>
                     {options}
                  </tr>

                  {loading && ingredients_options.length ? (
                     <InlineLoader />
                  ) : (
                     ingredients_options
                  )}
               </table>
               <br />
               <ButtonTile
                  type="secondary"
                  text="Add Ingredient"
                  onClick={() => openingredientTunnel(1)}
               />
            </>
         ) : (
            <ButtonTile
               type="secondary"
               text="Add Servings"
               onClick={() => openTunnel(1)}
            />
         )}
      </>
   )
}

export default Servings


const SachetDetails = ({ yieldId, slipName, ingredientProcessingRecordId }) => {
   const [history, setHistory] = React.useState({
      slipName,
   })
   const [name, setName] = React.useState(slipName)

   React.useEffect(() => {
      setHistory({
         slipName,
      })
      setName(slipName)
   }, [slipName])

   // Mutation
   const [updateSachet] = useMutation(UPDATE_SIMPLE_RECIPE_YIELD_SACHET, {
      onCompleted: () => {
         toast.success('Updated!')
      },
      onError: error => {
         setName(history.slipName)
         toast.error('Something went wrong!')
         logger(error)
      },
   })

   const updateSlipName = () => {
      if (!name) {
         return toast.error('Slip name is required!')
      }
      updateSachet({
         variables: {
            ingredientProcessingRecordId,
            yieldId,
            set: {
               slipName: name,
            },
         },
      })
   }

   return (
      <Form.Group>
         <Form.Text
            id={`slipName-${yieldId}`}
            name={`slipName-${yieldId}`}
            onBlur={updateSlipName}
            onChange={e => setName(e.target.value)}
            variant='revamp-sm'
            value={name}
            placeholder="Enter slip name"
            hasError={!name}
         />
      </Form.Group>
   )
}