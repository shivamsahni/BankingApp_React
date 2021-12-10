import { useSelector } from "react-redux";
import { Fragment, useState } from "react";
import BasicTable from "../UI/BasicTable";
import InputWithIcons from "../UI/InputWithIcons";
import BasicCard from "../UI/BasicCard";

const ListTransactions = () => {
  const [searchFilter, setSearchFilter] = useState("");

  const allTransaction = useSelector(
    (state) => state.transactions.allTransactions
  );

  const currentBalance = useSelector(state => state.transactions.currentBalance)

  const SearchHandler = (text) => {
    setSearchFilter(text);
  };

  return (
    <Fragment>
        <BasicCard title={"Current Balance"} value={currentBalance} />
      <InputWithIcons label={"Type & Press Enter"} search={SearchHandler} />
      <BasicTable
        rows={
          searchFilter === ""
            ? allTransaction
            : allTransaction.filter((transaction) => {
                return transaction.description
                  .toLowerCase()
                  .includes(searchFilter.toLowerCase());
              })
        }
      />
    </Fragment>
  );
};

export default ListTransactions;
