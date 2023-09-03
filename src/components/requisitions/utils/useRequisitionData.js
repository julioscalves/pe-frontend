import { createContext, useContext, useState } from "react";

const RequisitionDataContext = createContext();

export const useRequisitionData = () => {
  return useContext(RequisitionDataContext);
};

export function RequisitionDataProvider({ children }) {
  const [requisitionData, setRequisitionData] = useState(null);
  const [backupData, setBackupData] = useState(null)

  return (
    <RequisitionDataContext.Provider
      value={{ requisitionData, setRequisitionData, backupData, setBackupData }}
    >
      {children}
    </RequisitionDataContext.Provider>
  );
}
