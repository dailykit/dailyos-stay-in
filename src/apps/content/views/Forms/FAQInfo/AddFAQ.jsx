import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useSubscription } from '@apollo/react-hooks'
import { Form, Spacer, TextButton, Text } from '@dailykit/ui'
import { Flex, Tooltip, InlineLoader } from '../../../../../shared/components'
import { logger } from '../../../../../shared/utils'
import { UPDATE_INFO_FAQ, FAQ_ONE } from '../../../graphql'
import validator from '../../validator'
import { useParams } from 'react-router-dom'

export default function AddFAQ() {
   const { id } = useParams()
   const [form, setForm] = useState({
      heading: {
         value: '',
         meta: {
            isValid: false,
            isTouched: false,
            errors: [],
         },
      },
      subHeading: {
         value: '',
         meta: {
            isValid: false,
            isTouched: false,
            errors: [],
         },
      },
      page: {
         value: '',
         meta: {
            isValid: false,
            isTouched: false,
            errors: [],
         },
      },
      identifier: {
         value: '',
         meta: {
            isValid: false,
            isTouched: false,
            errors: [],
         },
      },
   })

   const { loading: faqLoading, error } = useSubscription(FAQ_ONE, {
      variables: { id },
      onSubscriptionData: ({ subscriptionData: { data = {} } = {} }) => {
         if (data?.content_faqs.length > 0) {
            console.log(data)
            setForm({
               ...form,
               heading: {
                  value: data.content_faqs[0].heading,
                  meta: {
                     isValid: data?.content_faqs[0]?.heading ? true : false,
                     isTouched: false,
                     errors: [],
                  },
               },
               subHeading: {
                  value: data.content_faqs[0].subHeading,
                  meta: {
                     isValid: data?.content_faqs[0]?.subHeading ? true : false,
                     isTouched: false,
                     errors: [],
                  },
               },
               page: {
                  value: data.content_faqs[0].page,
                  meta: {
                     isValid: data?.content_faqs[0]?.page ? true : false,
                     isTouched: false,
                     errors: [],
                  },
               },
               identifier: {
                  value: data.content_faqs[0].identifier,
                  meta: {
                     isValid: data?.content_faqs[0]?.identifier ? true : false,
                     isTouched: false,
                     errors: [],
                  },
               },
            })
         }
      },
   })

   const [update_content_faqs, { loading: updateLoading }] = useMutation(
      UPDATE_INFO_FAQ,
      {
         onCompleted: () => toast.success('Successfully updated!'),
         onError: error => {
            toast.error('Failed to update!')
            logger(error)
         },
      }
   )

   const onBlur = e => {
      const { name, value } = e.target
      console.log(value)
      if (name === 'page' || name === 'identifier') {
         setForm({
            ...form,
            [name]: {
               ...form[name],
               meta: {
                  isTouched: true,
                  errors: validator.select(value).errors,
                  isValid: validator.select(value).isValid,
               },
            },
         })
      } else {
         setForm({
            ...form,
            [name]: {
               ...form[name],
               meta: {
                  isTouched: true,
                  errors: validator.text(value).errors,
                  isValid: validator.text(value).isValid,
               },
            },
         })
      }
   }

   const onSave = () => {
      if (
         form.heading.meta.isValid &&
         form.subHeading.meta.isValid &&
         form.page.meta.isValid &&
         form.identifier.meta.isValid
      ) {
         update_content_faqs({
            variables: {
               id,
               set: {
                  heading: form.heading.value,
                  subHeading: form.subHeading.value,
                  page: form.page.value,
                  identifier: form.identifier.value,
               },
            },
         })
      } else {
         return toast.error('Please provide proper inputs!!!')
      }
   }

   const pageOptions = [
      { id: 1, title: 'Select Page' },
      { id: 2, title: 'home' },
      { id: 3, title: 'select-plan' },
   ]

   const identifierOptions = [
      { id: 1, title: 'Select Identifier' },
      { id: 2, title: 'bottom-01' },
   ]

   if (faqLoading) return <InlineLoader />
   if (error) {
      logger(error)
      toast.error('Something went wrong')
   }

   return (
      <Flex>
         <Flex
            container
            alignItems="center"
            justifyContent="space-between"
            height="72px"
         >
            <Flex container alignItems="center">
               <Text as="h2">Add New FAQ</Text>
               <Tooltip identifier="faq_form_heading" />
            </Flex>
            <TextButton type="solid" onClick={onSave}>
               {updateLoading ? 'Saving...' : 'Save'}
            </TextButton>
         </Flex>
         <Form.Group>
            <Form.Label htmlFor="heading" title="heading">
               Heading*
            </Form.Label>
            <Form.Text
               id="heading"
               name="heading"
               value={form.heading.value}
               onBlur={onBlur}
               onChange={e =>
                  setForm({
                     ...form,
                     heading: {
                        ...form.heading,
                        value: e.target.value,
                     },
                  })
               }
               placeholder="Enter Heading..."
            />
            {form.heading.meta.isTouched &&
               !form.heading.meta.isValid &&
               form.heading.meta.errors.map((error, index) => (
                  <Form.Error key={index}>{error}</Form.Error>
               ))}
         </Form.Group>
         <Spacer size="32px" />
         <Form.Group>
            <Form.Label>Sub Heading*</Form.Label>
            <Form.TextArea
               id="subHeading"
               name="subHeading"
               value={form.subHeading.value}
               onBlur={onBlur}
               onChange={e =>
                  setForm({
                     ...form,
                     subHeading: {
                        ...form.subHeading,
                        value: e.target.value,
                     },
                  })
               }
               placeholder="Enter Sub Heading..."
            />
            {form.subHeading.meta.isTouched &&
               !form.subHeading.meta.isValid &&
               form.subHeading.meta.errors.map((error, index) => (
                  <Form.Error key={index}>{error}</Form.Error>
               ))}
         </Form.Group>
         <Spacer size="32px" />
         <Form.Group>
            <Form.Label>Page*</Form.Label>
            <Form.Select
               id="page"
               name="page"
               options={pageOptions}
               onBlur={onBlur}
               onChange={e =>
                  setForm({
                     ...form,
                     page: {
                        ...form.page,
                        value: e.target.value,
                     },
                  })
               }
               placeholder="Enter page option..."
               defaultValue={pageOptions[1]}
            />
            {form.page.meta.isTouched &&
               !form.page.meta.isValid &&
               form.page.meta.errors.map((error, index) => (
                  <Form.Error key={index}>{error}</Form.Error>
               ))}
         </Form.Group>
         <Spacer size="32px" />
         <Form.Group>
            <Form.Label>Identifier*</Form.Label>
            <Form.Select
               id="identifier"
               name="identifier"
               options={identifierOptions}
               onBlur={onBlur}
               onChange={e =>
                  setForm({
                     ...form,
                     identifier: {
                        ...form.identifier,
                        value: e.target.value,
                     },
                  })
               }
               placeholder="Enter identifier..."
               defaultValue={identifierOptions[1]}
            />
            {form.identifier.meta.isTouched &&
               !form.identifier.meta.isValid &&
               form.identifier.meta.errors.map((error, index) => (
                  <Form.Error key={index}>{error}</Form.Error>
               ))}
         </Form.Group>
      </Flex>
   )
}
