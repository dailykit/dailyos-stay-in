import React, { useState } from 'react'
import {
   Toggle,
   Input,
   Loader,
   Text,
   HorizontalTab,
   HorizontalTabs,
   HorizontalTabList,
   HorizontalTabPanel,
   HorizontalTabPanels,
} from '@dailykit/ui'
import { useSubscription, useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTabs } from '../../../context'
import {
   StyledHeader,
   StyledWrapper,
   CenterDiv,
   InputWrapper,
   StyledRow,
   StyledComp,
   StyledDiv,
} from './styled'
import { CAMPAIGN_DATA, UPDATE_CAMPAIGN } from '../../../graphql'
import {
   ConditionComp,
   DetailsComp,
   RewardComp,
   BrandCampaign,
} from './components'

const CampaignForm = () => {
   const { addTab, tab, setTitle: setTabTitle } = useTabs()
   const { id: campaignId } = useParams()
   const [campaignTitle, setCampaignTitle] = useState('')
   const [type, setType] = useState('')
   const [state, setState] = useState({})
   const [toggle, setToggle] = useState(false)
   const [checkbox, setCheckbox] = useState(false)
   // Subscription
   const { loading } = useSubscription(CAMPAIGN_DATA, {
      variables: {
         id: campaignId,
      },
      onSubscriptionData: data => {
         setState(data.subscriptionData.data.campaign)
         setCampaignTitle(data.subscriptionData.data.campaign.metaDetails.title)
         setType(data.subscriptionData.data.campaign.type)
         setToggle(data.subscriptionData.data.campaign.isActive)
         setTabTitle(data.subscriptionData.data.campaign.metaDetails.title)
         setCheckbox(data.subscriptionData.data.campaign.isRewardMulti)
      },
   })

   // Mutation
   const [updateCoupon] = useMutation(UPDATE_CAMPAIGN, {
      onCompleted: () => {
         toast.success('Updated!')
         setTabTitle(campaignTitle)
      },
      onError: error => {
         console.log(error)
         toast.error('Error')
      },
   })

   const updateCampaignTitle = () => {
      if (campaignTitle) {
         updateCoupon({
            variables: {
               id: campaignId,
               set: {
                  metaDetails: { ...state.metaDetails, title: campaignTitle },
               },
            },
         })
      }
   }
   const updatetoggle = () => {
      if (toggle || !toggle) {
         updateCoupon({
            variables: {
               id: campaignId,
               set: {
                  isActive: !toggle,
               },
            },
         })
      }
   }

   const updateCheckbox = () => {
      if (checkbox || !checkbox) {
         updateCoupon({
            variables: {
               id: campaignId,
               set: {
                  isRewardMulti: !checkbox,
               },
            },
         })
      }
   }

   React.useEffect(() => {
      if (!tab) {
         addTab('Campaign', '/crm/campaign')
      }
   }, [addTab, tab])

   if (loading) return <Loader />
   return (
      <StyledWrapper>
         <StyledHeader gridCol="15fr 2fr">
            <InputWrapper>
               <Input
                  type="text"
                  label="Campaign Name"
                  name="code"
                  value={campaignTitle}
                  onChange={e => setCampaignTitle(e.target.value)}
                  onBlur={updateCampaignTitle}
               />
            </InputWrapper>
            <Toggle checked={toggle} setChecked={updatetoggle} />
         </StyledHeader>

         <StyledDiv>
            <HorizontalTabs>
               <HorizontalTabList>
                  <HorizontalTab>Details</HorizontalTab>
                  <HorizontalTab>Brand</HorizontalTab>
                  <HorizontalTab>Insights</HorizontalTab>
               </HorizontalTabList>
               <HorizontalTabPanels>
                  <HorizontalTabPanel>
                     <StyledComp>
                        <DetailsComp state={state} campaignType={type} />
                        <ConditionComp state={state} />
                        <RewardComp
                           state={state}
                           checkbox={checkbox}
                           updateCheckbox={updateCheckbox}
                        />
                     </StyledComp>
                  </HorizontalTabPanel>
                  <HorizontalTabPanel>
                     <BrandCampaign state={state} />
                  </HorizontalTabPanel>
                  <HorizontalTabPanel>
                     Insights Content coming soon!!
                  </HorizontalTabPanel>
               </HorizontalTabPanels>
            </HorizontalTabs>
         </StyledDiv>
      </StyledWrapper>
   )
}

export default CampaignForm
