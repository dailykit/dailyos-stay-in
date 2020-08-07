import gql from 'graphql-tag'

export const OCCURRENCES_DATES = gql`
   subscription occurrences_dates {
      occurrences_dates: subscriptionOccurences(distinct_on: fulfillmentDate) {
         date: fulfillmentDate
      }
   }
`

export const SUBSCRIPTION_OCCURENCES = gql`
   subscription subscriptionOccurences($fulfillmentDate: date_comparison_exp!) {
      subscriptionOccurences: subscriptionOccurencesAggregate(
         where: { fulfillmentDate: $fulfillmentDate }
      ) {
         aggregate {
            count
         }
         nodes {
            id
            isValid
            isVisible
            startTimeStamp
            fulfillmentDate
            cutoffTimeStamp
            products: products_aggregate {
               aggregate {
                  count
               }
            }
            subscription {
               id
               rrule
               products: subscriptionProducts_aggregate {
                  aggregate {
                     count
                  }
               }
               customers: customers_aggregate(
                  where: { isSubscriber: { _eq: true } }
               ) {
                  aggregate {
                     count
                  }
               }
               itemCount: subscriptionItemCount {
                  count
                  price
                  serving: subscriptionServing {
                     size: servingSize
                     subscriptionTitle {
                        title
                     }
                  }
               }
            }
         }
      }
   }
`

export const SIMPLE_RECIPE_PRODUCT_OPTIONS = gql`
   query productOptions($type: String_comparison_exp!) {
      productOptions: simpleRecipeProductOptionsAggregate(
         where: {
            type: $type
            simpleRecipeProduct: { isPublished: { _eq: true } }
         }
      ) {
         aggregate {
            count
         }
         nodes {
            id
            isActive
            price
            type
            recipeYield: simpleRecipeYield {
               size: yield(path: "serving")
               recipe: simpleRecipe {
                  cuisine
                  cookingTime
                  author
                  assets
                  image
               }
            }
            recipeProduct: simpleRecipeProduct {
               name
            }
         }
      }
   }
`
