import React, { useEffect, useState } from 'react';
import {
  gql, useMutation
} from "@apollo/client"
import { Invoice } from "./Invoice"
import { Spin } from 'antd';

const LN_INVOICE_CREATE_ON_BEHALF_OF_RECIPIENT = gql`
  mutation lnInvoiceCreateOnBehalfOfRecipient($walletId: WalletId!, $amount: SatAmount!) {
    mutationData: lnInvoiceCreateOnBehalfOfRecipient(
      input: { recipientWalletId: $walletId, amount: $amount }
    ) {
      errors {
        message
      }
      invoice {
        paymentRequest
      }
    }
  }
`

type OperationError = {
  message: string
}

interface InvoiceGeneratorProbs {
  sats: number
  walletId: string
  onPaymentSuccess?: () => void
}

type LnInvoiceObject = {
  paymentRequest: string
}


export function InvoiceGenerator(props: InvoiceGeneratorProbs) {

  const [invoiceStatus, setInvoiceStatus] = useState<
    "loading" | "new" | "need-update" | "expired" | "paid"
  >("loading")

  const [createInvoice, { loading, error, data }] = useMutation<{
    mutationData: {
      errors: OperationError[]
      invoice?: LnInvoiceObject
    }
  }>(LN_INVOICE_CREATE_ON_BEHALF_OF_RECIPIENT, {
    onError: console.error,
    onCompleted: () => setInvoiceStatus("new"),
  })

  useEffect(() => {
    if (props.walletId !== "") {
      createInvoice({
        variables: {
          walletId: props.walletId,
          amount: props.sats
        },
      })
    }
  }, [createInvoice, props.walletId, props.sats]);

  let errorString: string | null = error?.message || null
  let invoice

  if (data) {
    console.log(data)
    const invoiceData = data.mutationData
    if (invoiceData.errors?.length > 0) {
      errorString = invoiceData.errors.map((e) => e.message).join(", ")
    } else {
      invoice = invoiceData.invoice?.paymentRequest
    }
  }

  if (errorString) {
    return <div className="error">{errorString}</div>
  }

  if (loading) {
    return <Spin size="large" />
  }

  if (!invoice) return null

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

        <Invoice paymentRequest={invoice} onPaymentSuccess={() => setInvoiceStatus("paid")}/>
    </>
  )
}
