import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useMutation } from '@apollo/react-hooks'
import { Form, Spacer, TextButton, Text } from '@dailykit/ui'
import { Flex, Tooltip } from '../../../../shared/components'
import { INSERT_INFO_GRID } from '../../graphql'
import validator from '../validator'

export const AddInfoGrid = () => {
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

   const [insert_content_informationGrid_one, { loading }] = useMutation(
      INSERT_INFO_GRID,
      {
         onCompleted: () => toast.success('Created succesfully!'),
         onError: () => toast.error('Failed to create!'),
      }
   )

   const onSave = () => {
      if (
         form.heading.meta.isTouched &&
         form.subHeading.meta.isTouched &&
         form.page.meta.isTouched &&
         form.identifier.meta.isTouched
      ) {
         insert_content_informationGrid_one({
            variables: {
               object: {
                  heading: form.heading.value,
                  subHeading: form.subHeading.value,
                  page: form.page.value,
                  identifier: form.identifier.value,
               },
            },
         })
      } else {
         return toast.error('Please provide proper inputs!')
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

   return (
      <Flex maxWidth="1280px" width="calc(100vw - 64px)" margin="0 auto">
         <Flex
            container
            alignItems="center"
            justifyContent="space-between"
            height="72px"
         >
            <Flex container alignItems="center">
               <Text as="h2">Add New Information Grid</Text>
               <Tooltip identifier="recipes_list_heading" />
            </Flex>
         </Flex>
         <Spacer size="64x" />
         <div align="right">
            <TextButton type="solid" onClick={onSave}>
               {loading ? 'Saving...' : 'Save'}
            </TextButton>
         </div>
         <Spacer size="20px" />
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
