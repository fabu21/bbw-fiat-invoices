import { useEffect } from 'react';
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

  const [createInvoice, { loading, error, data }] = useMutation<{
    mutationData: {
      errors: OperationError[]
      invoice?: LnInvoiceObject
    }
  }>(LN_INVOICE_CREATE_ON_BEHALF_OF_RECIPIENT, {
    onError: console.error
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
    return <>
      <div>
        <Spin size="large" />
      </div>
    </>
  }

  if (!invoice) return null
  return (
    <>
      <Invoice paymentRequest={invoice} />
    </>
  )
}
