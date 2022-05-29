import React, { useEffect, useState } from 'react';
import {
  gql, useMutation, useSubscription
} from "@apollo/client"
import { QRCode } from "react-qrcode-logo"
import { Lottie } from "../lib/Lottie"
import animationData from "./success-animation.json"


const LN_INVOICE_PAYMENT_STATUS = gql`
  subscription lnInvoicePaymentStatus($input: LnInvoicePaymentStatusInput!) {
    lnInvoicePaymentStatus(input: $input) {
      errors {
        message
      }
      status
    }
  }
  `

type OperationError = {
  message: string
}

export function Invoice({
  paymentRequest,
  onPaymentSuccess,
}: {
  paymentRequest: string
  onPaymentSuccess?: () => void
}) {

  console.log(`Invoice Paymentrequest: ${paymentRequest}`)
  
  const { loading, error, data } = useSubscription<{
    lnInvoicePaymentStatus: {
      errors: OperationError[]
      status?: string
    }
  }>(LN_INVOICE_PAYMENT_STATUS, {
    variables: {
      input: {
        paymentRequest,
      },
    },
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      if (subscriptionData?.data?.lnInvoicePaymentStatus?.status === "PAID") {
        onPaymentSuccess && onPaymentSuccess()
      }
    }
  })

  // if (invoiceStatus === "expired") {
  //   return (
  //     <div className="warning expired-invoice">
  //       Invoice Expired...{" "}
  //       <span className="clickable" onClick={regenerate}>
  //         Generate New Invoice
  //       </span>
  //     </div>
  //   )
  // }

  console.log(`Invoice ${loading} ${paymentRequest}`)

  if (loading) {
    return (
      <>
        {/* {invoiceStatus === "need-update" && (
          <div className="warning">
            Stale Price...{" "}
            { <span className="clickable" onClick={regenerate}>
              Regenerate Invoice
            </span> 
          </div>
        )} */}

        <QRCode
          value={`${paymentRequest}`}
          size={280}
        />
      </>
    )
  }

  if (data) {
    const { errors, status } = data.lnInvoicePaymentStatus
    if (errors.length > 0) {
      console.error(errors)
      return <><div className="error">{errors[0].message}</div></>
    }
    if (status === "PAID") {
      return (
        <div>
          <Lottie
            animationData={animationData} height={280} width={280}
          ></Lottie>
        </div>
      )
    }
  }

  return null
}
