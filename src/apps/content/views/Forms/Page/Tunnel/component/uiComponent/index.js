import React from 'react'
import { Form, Loader, Flex, Spacer } from '@dailykit/ui'
import { Tooltip } from '../../../../../../../../shared/components'

export const Text = ({ fieldDetail, marginLeft, path, onConfigChange }) => (
   <Flex
      container
      justifyContent="space-between"
      alignItems="center"
      margin={`0 0 0 ${marginLeft}`}
   >
      <Flex container alignItems="flex-end">
         <Form.Label title={fieldDetail.label} htmlFor="text">
            {fieldDetail.label.toUpperCase()}
         </Form.Label>
         <Tooltip identifier="text_component_info" />
      </Flex>
      <Form.Text
         id={path}
         name={path}
         onChange={onConfigChange}
         value={fieldDetail?.value || fieldDetail.default}
         placeholder="Enter the orientation"
      />
   </Flex>
)

export const Toggle = ({ fieldDetail, marginLeft, path, onConfigChange }) => (
   <Flex
      container
      justifyContent="space-between"
      alignItems="center"
      margin={`0 0 0 ${marginLeft}`}
   >
      <Flex container alignItems="flex-end">
         <Form.Label title={fieldDetail.label} htmlFor="toggle">
            {fieldDetail.label.toUpperCase()}
         </Form.Label>
         <Tooltip identifier="toggle_component_info" />
      </Flex>
      <Form.Toggle
         name={path}
         onChange={e => onConfigChange(e, !fieldDetail.value)}
         value={fieldDetail.value}
         children={fieldDetail.value ? 'ON' : 'OFF'}
      />
   </Flex>
)

export const ColorPicker = ({
   fieldDetail,
   marginLeft,
   path,
   onConfigChange,
}) => (
   <Flex
      container
      justifyContent="space-between"
      alignItems="center"
      margin={`0 0 0 ${marginLeft}`}
   >
      <Flex container alignItems="flex-end">
         <Form.Label title={fieldDetail.label} htmlFor="color">
            {fieldDetail.label.toUpperCase()}
         </Form.Label>
         <Tooltip identifier="color_component_info" />
      </Flex>
      <input
         type="color"
         id="favcolor"
         name={path}
         value={fieldDetail?.value || fieldDetail.default}
         onChange={onConfigChange}
      />
   </Flex>
)

export const Number = ({ fieldDetail, marginLeft, path, onConfigChange }) => (
   <Flex
      container
      justifyContent="space-between"
      alignItems="center"
      margin={`0 0 0 ${marginLeft}`}
   >
      <Flex container alignItems="flex-end">
         <Form.Label title={fieldDetail.label} htmlFor="number">
            {fieldDetail.label.toUpperCase()}
         </Form.Label>
         <Tooltip identifier="number_component_info" />
      </Flex>
      <Form.Number
         id={path}
         name={path}
         onChange={onConfigChange}
         value={fieldDetail?.value || fieldDetail.default}
         placeholder="Enter integer value"
      />
   </Flex>
)

export const Checkbox = ({ fieldDetail, marginLeft, path, onConfigChange }) => (
   <Flex
      container
      justifyContent="space-between"
      alignItems="center"
      margin={`0 0 0 ${marginLeft}`}
   >
      <Flex container alignItems="flex-end">
         <Form.Label title={fieldDetail.label} htmlFor="checkbox">
            {fieldDetail.label.toUpperCase()}
         </Form.Label>
         <Tooltip identifier="checkbox_component_info" />
      </Flex>
      <Form.Checkbox
         id={path}
         name={path}
         onChange={e => onConfigChange(e, !fieldDetail.value)}
         value={fieldDetail.value}
      />
   </Flex>
)
export const Date = ({ fieldDetail, marginLeft, path, onConfigChange }) => (
   <Flex
      container
      justifyContent="space-between"
      alignItems="center"
      margin={`0 0 0 ${marginLeft}`}
   >
      <Flex container alignItems="flex-end">
         <Form.Label title={fieldDetail.label} htmlFor="date">
            {fieldDetail.label.toUpperCase()}
         </Form.Label>
         <Tooltip identifier="date_component_info" />
      </Flex>
      <Form.Date
         id={path}
         name={path}
         onChange={onConfigChange}
         value={fieldDetail?.value || fieldDetail.default}
      />
   </Flex>
)
export const Time = ({ fieldDetail, marginLeft, path, onConfigChange }) => (
   <Flex
      container
      justifyContent="space-between"
      alignItems="center"
      margin={`0 0 0 ${marginLeft}`}
   >
      <Flex container alignItems="flex-end">
         <Form.Label title={fieldDetail.label} htmlFor="time">
            {fieldDetail.label.toUpperCase()}
         </Form.Label>
         <Tooltip identifier="time_component_info" />
      </Flex>
      <Form.Time
         id={path}
         name={path}
         onChange={onConfigChange}
         value={fieldDetail?.value || fieldDetail.default}
      />
   </Flex>
)
export const Select = ({ fieldDetail, marginLeft, path, onConfigChange }) => (
   <Flex
      container
      justifyContent="space-between"
      alignItems="center"
      margin={`0 0 0 ${marginLeft}`}
   >
      <Flex container alignItems="flex-end">
         <Form.Label title={fieldDetail.label} htmlFor="select">
            {fieldDetail.label.toUpperCase()}
         </Form.Label>
         <Tooltip identifier="select_component_info" />
      </Flex>
      <Form.Select
         id={path}
         name={path}
         onChange={onConfigChange}
         options={fieldDetail.options}
         value={fieldDetail.value}
         defaultValue={fieldDetail.default}
      />
   </Flex>
)

export const TextArea = ({ fieldDetail, marginLeft, path, onConfigChange }) => (
   <Flex
      container
      justifyContent="space-between"
      alignItems="center"
      margin={`0 0 0 ${marginLeft}`}
   >
      <Flex container alignItems="flex-end">
         <Form.Label title={fieldDetail.label} htmlFor="textArea">
            {fieldDetail.label.toUpperCase()}
         </Form.Label>
         <Tooltip identifier="textArea_component_info" />
      </Flex>
      <Form.TextArea
         id={path}
         name={path}
         onChange={onConfigChange}
         value={fieldDetail?.value || fieldDetail.default}
      />
   </Flex>
)
export const TextWithSelect = ({
   fieldDetail,
   marginLeft,
   path,
   onConfigChange,
}) => (
   <Flex
      container
      justifyContent="space-between"
      alignItems="center"
      margin={`0 0 0 ${marginLeft}`}
   >
      <Flex container alignItems="flex-end">
         <Form.Label title={fieldDetail.label} htmlFor="textArea">
            {fieldDetail.label.toUpperCase()}
         </Form.Label>
         <Tooltip identifier="textArea_component_info" />
      </Flex>
      <Form.TextSelect>
         <Form.Text
            id={path}
            name={path}
            onChange={onConfigChange}
            placeholder="Enter text"
            value={fieldDetail?.text.value || fieldDetail.text.default}
         />
         <Form.Select
            id={path}
            name={path}
            onChange={onConfigChange}
            options={fieldDetail.select.options}
            value={fieldDetail.select.value}
            defaultValue={fieldDetail.select.default}
         />
      </Form.TextSelect>
   </Flex>
)
export const NumberWithSelect = ({
   fieldDetail,
   marginLeft,
   path,
   onConfigChange,
}) => (
   <Flex
      container
      justifyContent="space-between"
      alignItems="center"
      margin={`0 0 0 ${marginLeft}`}
   >
      <Flex container alignItems="flex-end">
         <Form.Label title={fieldDetail.label} htmlFor="numberWithSelect">
            {fieldDetail.label.toUpperCase()}
         </Form.Label>
         <Tooltip identifier="textArea_component_info" />
      </Flex>
      <Form.TextSelect>
         <Form.Text
            id={path}
            name={path}
            onChange={onConfigChange}
            placeholder="Enter integer value"
            value={fieldDetail?.number.value || fieldDetail.number.default}
         />
         <Form.Select
            id={path}
            name={path}
            onChange={onConfigChange}
            options={fieldDetail.select.options}
            value={fieldDetail.select.value}
            defaultValue={fieldDetail.select.default}
         />
      </Form.TextSelect>
   </Flex>
)