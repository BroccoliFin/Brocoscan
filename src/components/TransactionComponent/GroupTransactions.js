import { getRelativetime } from "../../utils/formatter";
import styles from "../../resources/css/Transactions.module.css";
import TransactionStructureToken from "./TransactionsStructureToken";

const GroupTransactions = ({ txns, address, cluster }) => {
  return (
    <>
      {txns.length > 0
        ? txns.map((each_txn) => (
            <div>
              <div className={styles.feed_txn_outer_2}>
                <div className={styles.time_area}>
                  {each_txn.timestamp !== ""
                    ? getRelativetime(each_txn.timestamp)
                    : ""}
                </div>
              </div>
              <TransactionStructureToken
                styles={styles}
                id={each_txn.signatures[0]}
                data={each_txn}
                address={address}
                cluster={cluster}
              />
            </div>
          ))
        : ""}
    </>
  );
};

export default GroupTransactions;
