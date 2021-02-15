import React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import {
   List,
   ListItem,
   ListOptions,
   ListSearch,
   useSingleList,
   TunnelHeader,
   Filler,
   ListHeader,
} from '@dailykit/ui'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import {
   CREATE_SIMPLE_RECIPE_PRODUCT_OPTIONS,
   UPDATE_SIMPLE_RECIPE_PRODUCT,
   SIMPLE_RECIPES,
   CREATE_SIMPLE_RECIPE,
} from '../../../../../../graphql'
import { TunnelBody } from '../styled'
import { logger } from '../../../../../../../../shared/utils'
import {
   InlineLoader,
   Tooltip,
} from '../../../../../../../../shared/components'

const address =
   'apps.menu.views.forms.product.simplerecipeproduct.tunnels.recipetunnel.'

export default function RecipeTunnel({ state, close }) {
   const { t } = useTranslation()

   const [busy, setBusy] = React.useState(false)

   const [search, setSearch] = React.useState('')
   const [recipes, setRecipes] = React.useState([])
   const [list, current, selectOption] = useSingleList(recipes)

   // Subscription for fetching recipes
   const { loading } = useQuery(SIMPLE_RECIPES, {
      variables: {
         where: {
            _and: [
               {
                  isPublished: { _eq: true },
               },
               {
                  isArchived: { _eq: false },
               },
            ],
         },
      },
      onCompleted: data => {
         const { simpleRecipes } = data
         const updatedRecipes = simpleRecipes.filter(
            item => item.isValid.status
         )
         setRecipes([...updatedRecipes])
      },
      onError: error => {
         toast.error('Something went wrong!')
         logger(error)
      },
      fetchPolicy: 'cache-and-network',
   })

   const [createOptions] = useMutation(CREATE_SIMPLE_RECIPE_PRODUCT_OPTIONS, {
      variables: {
         objects: current.simpleRecipeYields?.flatMap(serving => {
            return [
               {
                  simpleRecipeProductId: state.id,
                  simpleRecipeYieldId: serving.id,
                  type: 'mealKit',
                  isActive: true,
                  price: [
                     {
                        rule: '',
                        value: '0',
                        discount: '0',
                     },
                  ],
               },
               {
                  simpleRecipeProductId: state.id,
                  simpleRecipeYieldId: serving.id,
                  type: 'readyToEat',
                  isActive: true,
                  price: [
                     {
                        rule: '',
                        value: '0',
                        discount: '0',
                     },
                  ],
               },
            ]
         }),
      },
      onCompleted: () => {
         toast.success('Options added!')
         close(1)
      },
      onError: error => {
         toast.error('Something went wrong!')
         logger(error)
         setBusy(false)
      },
   })

   // Mutation
   const [updateProduct] = useMutation(UPDATE_SIMPLE_RECIPE_PRODUCT, {
      onCompleted: () => {
         toast.success('Recipe added! Creating options...')
         if (current.simpleRecipeYields?.length) {
            createOptions()
         } else {
            close(1)
         }
      },
      onError: error => {
         toast.error('Something went wrong!')
         logger(error)
         setBusy(false)
      },
   })

   const [createRecipe] = useMutation(CREATE_SIMPLE_RECIPE, {
      onCompleted: data => {
         updateProduct({
            variables: {
               id: state.id,
               set: {
                  simpleRecipeId: data.createSimpleRecipe.returning[0].id,
               },
            },
         })
      },
      onError: error => {
         toast.error('Something went wrong!')
         logger(error)
      },
   })

   // Handlers
   const add = () => {
      if (busy) return
      setBusy(true)
      updateProduct({
         variables: {
            id: state.id,
            set: {
               simpleRecipeId: current.id,
            },
         },
      })
   }

   const quickCreateRecipe = () => {
      const recipeName = search.slice(0, 1).toUpperCase() + search.slice(1)
      createRecipe({ variables: { objects: { name: recipeName } } })
   }

   React.useEffect(() => {
      if (current.id && !busy) {
         add()
      }
   }, [current.id])

   return (
      <>
         <TunnelHeader
            title={t(address.concat('select a recipe'))}
            close={() => close(1)}
            tooltip={
               <Tooltip identifier="simple_recipe_product_recipe_tunnel" />
            }
         />
         <TunnelBody>
            {loading ? (
               <InlineLoader />
            ) : (
               <>
                  {list.length ? (
                     <List>
                        {Object.keys(current).length > 0 ? (
                           <ListItem type="SSL1" title={current.title} />
                        ) : (
                           <ListSearch
                              onChange={value => setSearch(value)}
                              placeholder={t(
                                 address.concat("type what you're looking for")
                              )}
                           />
                        )}
                        <ListHeader type="SSL1" label="Recipes" />
                        <ListOptions
                           search={search}
                           handleOnCreate={quickCreateRecipe}
                        >
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
                                    onClick={() =>
                                       selectOption('id', option.id)
                                    }
                                 />
                              ))}
                        </ListOptions>
                     </List>
                  ) : (
                     <Filler message="No recipe found! To start, please add some." />
                  )}
               </>
            )}
         </TunnelBody>
      </>
   )
}