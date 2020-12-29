import React, { useState, useEffect, useContext, useRef } from 'react'
import {
   Flex,
   HorizontalTab,
   HorizontalTabs,
   HorizontalTabList,
   HorizontalTabPanel,
   HorizontalTabPanels,
   Form,
   Spacer,
   Text,
   ButtonTile,
} from '@dailykit/ui'
import { useSubscription, useMutation, useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTabs } from '../../../context'
import {
   StyledWrapper,
   StyledComp,
   InputWrapper,
   StyledDiv,
   StyledInsight,
   Highlight,
} from './styled'
import { PAGE_INFO, UPDATE_WEBPAGE } from '../../../graphql'
import { logger } from '../../../../../shared/utils'
import {
   Tooltip,
   InlineLoader,
   InsightDashboard,
} from '../../../../../shared/components'
import moment from 'moment'
import { CloseIcon, TickIcon } from '../../../../../shared/assets/icons'
import ContentSelection from './ContentSelection'
import BrandContext from '../../../context/Brand'

const PageForm = () => {
   const { addTab, tab, setTitle: setTabTitle, closeAllTabs } = useTabs()
   const [context, setContext] = useContext(BrandContext)
   const prevBrandId = useRef(context.brandId)
   const { pageId, pageName } = useParams()
   const [pageTitle, setPageTitle] = useState({
      value: '',
      meta: {
         isValid: false,
         isTouched: false,
         errors: [],
      },
   })
   const [pageRoute, setPageRoute] = useState({
      value: '',
      meta: {
         isValid: false,
         isTouched: false,
         errors: [],
      },
   })
   const [state, setState] = useState({})
   const [toggle, setToggle] = useState(false)
   const [checkbox, setCheckbox] = useState(false)
   const today = moment().toISOString()
   const fromDate = moment().subtract(7, 'days').toISOString()

   // form validation
   const validatePageName = (value, name) => {
      const text = value.trim()
      console.log(`text ${text.length}`)
      let isValid = true
      let errors = []
      if (name === 'pageTitle') {
         if (text.length < 2) {
            isValid = false
            errors = [...errors, 'Must have atleast two letters.']
         }
      } else {
         if (text.length < 1) {
            isValid = false
            errors = [...errors, 'Must have atleast one letters.']
         }
      }
      console.log(isValid)
      return { isValid, errors }
   }

   // Subscription
   const { loading, error } = useSubscription(PAGE_INFO, {
      variables: {
         pageId,
      },
      onSubscriptionData: ({
         subscriptionData: {
            data: { website_websitePage_by_pk: websitePage = {} } = {},
         } = {},
      }) => {
         setState(websitePage || {})
         setPageTitle({
            ...pageTitle,
            value: websitePage?.internalPageName || '',
         })
         console.log(websitePage.route)
         setPageRoute({
            ...pageRoute,
            value: websitePage?.route || '',
         })
         setToggle(websitePage?.published)
      },
   })

   // Mutation
   const [updatePage] = useMutation(UPDATE_WEBPAGE, {
      onCompleted: () => {
         toast.success('Updated!')
         setTabTitle(pageTitle.value)
      },
      onError: error => {
         toast.error('Something went wrong')
         logger(error)
      },
   })

   const updatetoggle = () => {
      const val = !toggle
      // if (val && !state.isCouponValid.status) {
      //    toast.error('Coupon should be valid!')
      // } else {
      updatePage({
         variables: {
            pageId: pageId,
            set: {
               published: val,
            },
         },
      })
      // }
   }
   // const updateCheckbox = () => {
   //    updatePage({
   //       variables: {
   //          id: couponId,
   //          set: {
   //             isRewardMulti: !checkbox,
   //          },
   //       },
   //    })
   // }

   useEffect(() => {
      if (!tab) {
         addTab('Pages', '/content/pages')
      }
   }, [addTab, tab])

   if (context.brandId !== prevBrandId.current) {
      closeAllTabs()
   }

   //page name validation & update name handler
   const onBlur = e => {
      if (e.target.name === 'pageTitle') {
         setPageTitle({
            ...pageTitle,
            meta: {
               ...pageTitle.meta,
               isTouched: true,
               errors: validatePageName(e.target.value, e.target.name).errors,
               isValid: validatePageName(e.target.value, e.target.name).isValid,
            },
         })
         if (
            validatePageName(e.target.value, e.target.name).isValid &&
            validatePageName(e.target.value, e.target.name).errors.length === 0
         ) {
            updatePage({
               variables: {
                  pageId: pageId,
                  set: {
                     internalPageName: e.target.value,
                  },
               },
            })
         }
      } else {
         setPageRoute({
            ...pageRoute,
            meta: {
               ...pageRoute.meta,
               isTouched: true,
               errors: validatePageName(e.target.value, e.target.name).errors,
               isValid: validatePageName(e.target.value, e.target.name).isValid,
            },
         })
         if (
            validatePageName(e.target.value, e.target.name).isValid &&
            validatePageName(e.target.value, e.target.name).errors.length === 0
         ) {
            updatePage({
               variables: {
                  pageId: pageId,
                  set: {
                     route: e.target.value,
                  },
               },
            })
         }
      }
   }

   if (loading) {
      return <InlineLoader />
   }
   if (error) {
      toast.error('Something went wrong')
      logger(error)
   }
   return (
      <StyledWrapper>
         <InputWrapper>
            <Flex
               container
               alignItems="center"
               justifyContent="space-between"
               padding="0 0 16px 0"
            >
               <Form.Group>
                  <Flex container alignItems="flex-end">
                     <Form.Label htmlFor="name" title="Page Name">
                        Page Name*
                     </Form.Label>
                     <Tooltip identifier="page_name_info" />
                  </Flex>
                  <Form.Text
                     id="pageName"
                     name="pageName"
                     value={pageTitle.value}
                     placeholder="Enter the Page Name "
                     onBlur={onBlur}
                     onChange={e =>
                        setPageTitle({
                           ...pageTitle,
                           value: e.target.value,
                        })
                     }
                  />
                  {pageTitle.meta.isTouched &&
                     !pageTitle.meta.isValid &&
                     pageTitle.meta.errors.map((error, index) => (
                        <Form.Error key={index}>{error}</Form.Error>
                     ))}
               </Form.Group>
               <Flex container alignItems="center" height="100%">
                  <Highlight>Preview Page</Highlight>
                  {/* {state.isCouponValid?.status ? (
                        <>
                           <TickIcon color="#00ff00" stroke={2} />
                           <Text as="p">All good!</Text>
                        </>
                     ) : (
                        <>
                           <CloseIcon color="#ff0000" />
                           <Text as="p">{state.isCouponValid?.error}</Text>
                        </>
                     )} */}
                  <Spacer xAxis size="24px" />
                  <Form.Toggle
                     name="page_published"
                     onChange={updatetoggle}
                     value={toggle}
                  >
                     <Flex container alignItems="center">
                        Publish
                        <Tooltip identifier="page_publish_info" />
                     </Flex>
                  </Form.Toggle>
               </Flex>
            </Flex>
         </InputWrapper>
         <StyledDiv>
            <HorizontalTabs>
               <div className="styleTab">
                  <HorizontalTabList>
                     <HorizontalTab>Details</HorizontalTab>
                     <HorizontalTab>Page Preview Meta data</HorizontalTab>
                  </HorizontalTabList>
               </div>
               <HorizontalTabPanels>
                  <div className="styleTab">
                     <HorizontalTabPanel>
                        <div className="pageDetails">
                           <Flex container>
                              <Form.Group>
                                 <Flex container alignItems="flex-end">
                                    <Form.Label htmlFor="name" title="Page URL">
                                       Page Route*
                                    </Form.Label>
                                    <Tooltip identifier="page_route_info" />
                                 </Flex>
                                 <Form.Text
                                    id="pageRoute"
                                    name="pageRoute"
                                    value={pageRoute.value}
                                    placeholder="Enter the Page Route "
                                    onBlur={onBlur}
                                    onChange={e =>
                                       setPageRoute({
                                          ...pageRoute,
                                          value: e.target.value,
                                       })
                                    }
                                 />
                                 {pageRoute.meta.isTouched &&
                                    !pageRoute.meta.isValid &&
                                    pageRoute.meta.errors.map(
                                       (error, index) => (
                                          <Form.Error key={index}>
                                             {error}
                                          </Form.Error>
                                       )
                                    )}
                              </Form.Group>
                           </Flex>
                        </div>
                     </HorizontalTabPanel>
                  </div>
                  <HorizontalTabPanel>
                     <div className="styleTab">Meda data goes here</div>
                  </HorizontalTabPanel>
               </HorizontalTabPanels>
            </HorizontalTabs>
            <hr style={{ color: '#e9e9e9' }} />
            <ContentSelection />
         </StyledDiv>
      </StyledWrapper>
   )
}

export default PageForm
