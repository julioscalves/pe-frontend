import { ROOT_URL, REQUISITIONS_PATH } from "@/utils/constants";

export default async function fetchData({ protocol, setRequisitionData, authToken }) {  
    try {
      const response = await fetch(ROOT_URL + REQUISITIONS_PATH + protocol, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Request failed');
      }
  
      const data = await response.json();
      setRequisitionData(data);
      return data;
    } catch (error) {
      throw error; 
    }
  }
