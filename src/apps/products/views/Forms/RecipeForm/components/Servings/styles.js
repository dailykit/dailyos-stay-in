import styled, { css } from 'styled-components'

export const StyledCardEven = styled.div(
   ({ index }) => css`
      height: 80px;
      width: 160px;
      padding: 5px 5px 5px 5px;
      background: ${index % 2 == 0 ? `#FFFFFF` : `#F4F4F4`};
      border: 1px solid #f4f4f4;
      box-sizing: border-box;
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 30px;
      line-height: 26px;
      letter-spacing: 0.32px;
      div#Serving {
         padding-left: 5px;
         display: inline-block;
         width: 86px;
      }
      div#menu {
         text-align: right;
         display: inline-block;
      }
      p {
         font-family: Roboto;
         font-style: normal;
         font-weight: normal;
         font-size: 12px;
         line-height: 10px;
      }
      div#calCount {
         display: inline-block;
         width: 36px;
         height: 16px;
         background: #f6c338;
         border-radius: 40px;
         font-family: Roboto;
         font-style: normal;
         font-weight: bold;
         font-size: 11px;
         line-height: 16px;
         margin: 0px 2px 0px 0px;
         letter-spacing: 0.32px;
         padding: 1px 0px 2.5px 5px;
         color: #ffffff;
      }
      div#foodCost {
         display: inline-block;
         width: 36px;
         height: 16px;
         background: #8ac03b;
         border-radius: 40px;
         font-family: Roboto;
         font-style: normal;
         font-weight: bold;
         font-size: 11px;
         line-height: 16px;
         margin: 0px 2px 0px 2px;
         letter-spacing: 0.32px;
         padding: 1px 5px 2.5px 5px;
         color: #ffffff;
      }
      div#yield {
         display: inline-block;
         width: 44px;
         height: 16px;
         background: #555b6e;
         border-radius: 40px;
         font-family: Roboto;
         font-style: normal;
         font-weight: bold;
         font-size: 11px;
         line-height: 16px;
         margin: 0px 0px 0px 2px;
         letter-spacing: 0.32px;
         padding: 1px 5px 2.5px 5px;
         color: #ffffff;
      }
   `
)

export const Heading = styled.div`
   padding: 12px 16px 80px 16px;
   font-family: Roboto;
   font-style: normal;
   font-weight: 500;
   font-size: 28px;
   line-height: 36px;
   letter-spacing: 0.32px;
   color: #202020;
`

export const StyledCardIngredient = styled.div(
   () => css`
      width: 238px;
      height: 130px;
      background: #ffffff;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 16px;
      padding: 19px 5px 13px 0px;
      display: inline-block;
      div#index{
        display: inline-block;
        width: 27px;
        height: 27px;
        border-radius: 50%;
        background: #F4F4F4;
        margin: 0px 18px 0px 0px;
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        line-height: 16px;
        color: #919699;
        letter-spacing: 0.32px;
        padding: 7px 0px 0px 0px;
        text-align: center;
      }
      div#dropdown{
        padding: 0px 0px 12px 45px;
      }
      div#calCountIngredient{
        display: inline-block;
        width: 99px;
        height: 18px;
        background: #F6C338;
        border-radius: 40px;
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 11px;
        line-height: 16px;
        margin: 0px 2px 0px 45px;
        letter-spacing: 0.32px;
        padding: 1px 0px 2.5px 5px;
        color: #FFFFFF;
      }
      div#chefPay{
        display: inline-block;
        width: 36px;
        height: 16px;
        background: #FF5A52;
        border-radius: 40px;
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 11px;
        line-height: 16px;
        margin: 0px 2px 0px 0px;
        letter-spacing: 0.32px;
        padding: 1px 0px 2.5px 5px;
        color: #FFFFFF;
      }
   `
)

export const SatchetCard = styled.div(
   ({ index }) => css`
      height: 90px;
      width: 160px;
      padding: 5px 5px 5px 5px;
      background: ${index % 2 == 0 ? `#FFFFFF` : `#F4F4F4`};
      border: 1px solid #f4f4f4;
      box-sizing: border-box;
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 30px;
      line-height: 26px;
      letter-spacing: 0.32px;
      div#sachetDetails{
        width: 181px;
        padding: 0px 0px 0px 0px;
      }
   `
)

export const StyledButton = styled.button(
   ({ index }) => css`
      height: 20px;
      width: 20px;
      padding: 2px 5px 5px 5px;
      background: ${index % 2 == 0 ? `#F4F4F4` : `#FFFFFF`};
      border: none;
      box-sizing: border-box;
   `
)
