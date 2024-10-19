import { getPaymentMethods } from "@/service/payment.service";
import { useEffect, useState } from "react";

const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPaymentMethods();
        setPaymentMethods(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return paymentMethods;
};

export default usePaymentMethods;
