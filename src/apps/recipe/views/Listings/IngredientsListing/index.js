import { useMutation, useSubscription } from '@apollo/react-hooks'
import {
   IconButton,
   Loader,
   SearchBox,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   Toggle,
} from '@dailykit/ui'
import * as moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { randomSuffix } from '../../../../../shared/utils'
// Icons
import { AddIcon, DeleteIcon } from '../../../assets/icons'
// State
import { Context } from '../../../context/tabs'
import {
   CREATE_INGREDIENT,
   S_INGREDIENTS,
   DELETE_INGREDIENTS,
   UPDATE_INGREDIENT,
} from '../../../graphql'
// Styled
import {
   GridContainer,
   StyledContent,
   StyledHeader,
   StyledPagination,
   StyledTableActions,
   StyledTableHeader,
   StyledWrapper,
} from '../styled'

const address = 'apps.recipe.views.listings.ingredientslisting.'

const IngredientsListing = () => {
   const { t } = useTranslation()
   const { dispatch } = React.useContext(Context)
   const [ingredients, setIngredients] = React.useState([])
   const [search, setSearch] = React.useState('')

   // Queries
   const { loading, error, data } = useSubscription(S_INGREDIENTS, {
      onSubscriptionData: data => {
         console.log(data)
         setIngredients(data.subscriptionData.data.ingredients)
      },
   })

   // Mutations
   const [createIngredient] = useMutation(CREATE_INGREDIENT, {
      onCompleted: data => {
         toast.success('Ingredient created!')
         addTab(
            data.createIngredient.returning[0].name,
            'ingredient',
            data.createIngredient.returning[0].id
         )
      },
      onError: error => {
         console.log(error)
         toast.error('Error')
      },
   })
   const [deleteIngredients] = useMutation(DELETE_INGREDIENTS, {
      onCompleted: data => {
         toast.success('Ingredient deleted!')
      },
      onError: error => {
         console.log(error)
         toast.error('Failed to delete!')
      },
   })
   const [updateIngredient] = useMutation(UPDATE_INGREDIENT, {
      onCompleted: () => {
         toast.success('Updated!')
      },
      onError: error => {
         console.log(error)
         toast.error('Error')
      },
   })

   // Effects
   React.useEffect(() => {
      if (data)
         setIngredients(
            data.ingredients.filter(ing =>
               ing.name.toLowerCase().includes(search.toLowerCase())
            )
         )
   }, [search])

   // Handlers
   const addTab = (title, view, id) => {
      dispatch({ type: 'ADD_TAB', payload: { type: 'forms', title, view, id } })
   }
   const createIngredientHandler = async () => {
      let name = 'ingredient-' + randomSuffix()
      createIngredient({ variables: { name } })
   }
   const deleteIngredientHandler = (e, ingredient) => {
      e.stopPropagation()
      if (
         window.confirm(
            `Are you sure you want to delete ingredient - ${ingredient.name}?`
         )
      ) {
         deleteIngredients({
            variables: {
               ids: [ingredient.id],
            },
         })
      }
   }
   const togglePublish = (val, ingredient) => {
      if (!ingredient.isPublished && !ingredient.isValid.status) {
         return toast.error('Ingredient should be valid!')
      }
      updateIngredient({
         variables: {
            id: ingredient.id,
            set: {
               isPublished: !ingredient.isPublished,
            },
         },
      })
   }

   if (loading) return <Loader />

   return (
      <StyledWrapper>
         <StyledHeader>
            <h1>{t(address.concat('ingredients'))}</h1>
            <StyledPagination>
               Total: {ingredients?.length}
               {/* <span disabled={true}>
                  <ChevronLeftIcon />
               </span>
               <span>
                  <ChevronRightIcon />
               </span> */}
            </StyledPagination>
         </StyledHeader>
         <StyledTableHeader>
            <p></p>
            <StyledTableActions>
               <SearchBox
                  placeholder={t(address.concat('search'))}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
               />
               <IconButton type="solid" onClick={createIngredientHandler}>
                  <AddIcon color="#fff" size={24} />
               </IconButton>
            </StyledTableActions>
         </StyledTableHeader>
         <StyledContent>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>Name</TableCell>
                     <TableCell>Processings</TableCell>
                     <TableCell>Created At</TableCell>
                     {/* <TableCell>Published</TableCell> */}
                     <TableCell> </TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {!loading &&
                     !error &&
                     ingredients.map(ingredient => (
                        <TableRow
                           key={ingredient.id}
                           onClick={() =>
                              addTab(
                                 ingredient.name,
                                 'ingredient',
                                 ingredient.id
                              )
                           }
                        >
                           <TableCell> {ingredient.name} </TableCell>
                           <TableCell>
                              {ingredient.ingredientProcessings.length}
                           </TableCell>
                           <TableCell>
                              {ingredient.createdAt
                                 ? moment(ingredient.createdAt).format('LLL')
                                 : 'NA'}
                           </TableCell>
                           {/* <TableCell>
                              <Toggle
                                 checked={ingredient.isPublished}
                                 setChecked={val =>
                                    togglePublish(val, ingredient)
                                 }
                              />
                           </TableCell> */}
                           <TableCell>
                              <GridContainer>
                                 <IconButton
                                    onClick={e =>
                                       deleteIngredientHandler(e, ingredient)
                                    }
                                 >
                                    <DeleteIcon color="#FF5A52" />
                                 </IconButton>
                              </GridContainer>
                           </TableCell>
                        </TableRow>
                     ))}
               </TableBody>
            </Table>
         </StyledContent>
      </StyledWrapper>
   )
}

export default IngredientsListing
