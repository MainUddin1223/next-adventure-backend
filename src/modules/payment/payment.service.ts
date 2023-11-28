import axios from 'axios';
import config from '../../utils/config';

const initPayment = async () => {
  const data: any = {
    store_id: config.ssl.store_id,
    store_passwd: config.ssl.store_pass,
    total_amount: 100,
    currency: 'BDT',
    tran_id: 'REF123',
    success_url: 'http://localhost:3030/success',
    fail_url: 'http://localhost:3030/fail',
    cancel_url: 'http://localhost:3030/cancel',
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: 'Customer Name',
    cus_email: 'customer@example.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };
  const response = await axios({
    method: 'post',
    url: config.ssl.ssl_payment_url,
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  console.log(response);
  return response.data;
};
export const paymentService = {
  initPayment,
};
