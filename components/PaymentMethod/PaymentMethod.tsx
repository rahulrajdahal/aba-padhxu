'use client';

import StripeElements from '@/app/order/StripeElements';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent, useMemo, useState } from 'react';
import Input from '../Input/Input';

export default function PaymentMethod() {
  const searchParams = useSearchParams();

  const paid = useMemo(
    () => (searchParams.get('payment_intent') ? true : false),
    [searchParams]
  );

  const [paymentMethod, setPaymentMethod] = useState('ONLINE');

  const handlePaymentMethodOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  return (
    !paid && (
      <>
        <strong>Payment Method</strong>
        <span className='flex items-center gap-4'>
          <Input
            label='Cash'
            className='!flex-row items-center gap-2'
            inputProps={{
              onChange: handlePaymentMethodOnChange,
              type: 'radio',
              name: 'paymentMethod',
              value: 'CASH',
              defaultChecked: paid,
            }}
          />

          <Input
            label='Online'
            className='!flex-row items-center gap-2'
            inputProps={{
              onChange: handlePaymentMethodOnChange,
              type: 'radio',
              name: 'paymentMethod',
              value: 'ONLINE',
              defaultChecked: !paid,
            }}
          />
        </span>

        {paymentMethod === 'ONLINE' && !paid && <StripeElements />}
      </>
    )
  );
}
