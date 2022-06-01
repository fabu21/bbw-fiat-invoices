import {
  gql, useSubscription
} from "@apollo/client"
import { QRCode } from "react-qrcode-logo"
import { Lottie } from "../lib/Lottie"
import animationData from "./success-animation.json"
import { Typography } from 'antd';

const { Paragraph } = Typography;

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

  const { loading, data } = useSubscription<{
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
      if (subscriptionData?.data?.lnInvoicePaymentStatus?.status === "PAID") {
        onPaymentSuccess && onPaymentSuccess()
      }
    }
  })

  if (loading) {
    return (
      <>
        <QRCode
          value={`${paymentRequest}`}
          size={280}
        />

        <Paragraph copyable={{ text: paymentRequest}} title={paymentRequest}>{paymentRequest.substring(0, 35)}... </Paragraph>
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
