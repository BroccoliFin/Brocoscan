import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Tooltip from "react-tooltip-lite";

import copyIcon from "../../resources/images/txnImages/copy_icon.svg";
import styles from "../../resources/css/Transactions.module.css";
import TxnLoader from "../loaders/TxnLoader";

import staticRefresh from "../../resources/images/txnImages/refresh_static.png";
import rotateRefresh from "../../resources/images/txnImages/refresh_rotate.gif";
import duration from "../../resources/images/txnImages/duration.png";
import avatar2 from "../../resources/images/txnImages/avatar2.svg";

import { motion } from "framer-motion";
import { shortenAddress } from "../../utils/formatter";
import GroupTransactions from "./GroupTransactions";

const refreshCounter = Number(
  process.env.REACT_APP_REFRESH_FEED_AFTER_SECS ?? "0"
);

const FeedTransactions = ({ address, cluster }) => {
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errOcc, setErrOcc] = useState(false);

  const [txns, setTxns] = useState([]);

  const [moreTxns, setMoreTxns] = useState(true);

  const [firstTxn, setFirstTxn] = useState("");
  const [recall, setRecall] = useState(false);
  const [timer, setTimer] = useState(refreshCounter);
  const [liveTxns, setLiveTxns] = useState([]);
  const [pauseTimer, setPauseTimer] = useState(false);
  const [chatFocus, setChatFocus] = useState(true);

  const [page, setPage] = useState(1);

  const { ref, inView } = useInView();

  const [copy, setCopied] = useState("Copy");

  useEffect(() => {
    console.log("current page value", page);
    if (isLoading === false) {
      if (inView === true) {
        console.log("Red square in view", inView);
        if (moreTxns === true && page > 1 && txns.length > 0) {
          console.log("Getting more txns");
          getPrevNext(page);
        }
      }
    }
  }, [inView]);

  useEffect(() => {
    setLoading(true);
    setTxns([]);
    setLiveTxns([]);
    const xToken = localStorage.getItem("reac_wid") ?? "";
    if (xToken) {
      var params = {
        network: cluster,
        account: address,
      };

      axios({
        url: `${process.env.REACT_APP_BACKEND_EP}/getTransactions/${cluster}/1`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${xToken}`,
        },
      })
        .then((res) => {
          if (res.data.txns.length > 0) {
            console.log("here");
            if (res.data.txns.length > 0) {
              const txnReceived = res.data.txns;
              const txnsReceivedGroup = [];
              if (txnReceived.length === 0) setMoreTxns(false);
              else {
                for (let index = 0; index < txnReceived.length - 1; index++) {
                  const currentTxn = txnReceived[index];
                  var groupedArray = [currentTxn];
                  var checkUpto = index;
                  for (let txn = index + 1; txn < txnReceived.length; txn++) {
                    const nextTxn = txnReceived[txn];
                    if (
                      nextTxn.tag_address !== "" &&
                      nextTxn.tag_address === currentTxn.tag_address
                    ) {
                      groupedArray.push(nextTxn);
                      checkUpto = txn;
                    } else break;
                  }
                  index = checkUpto;
                  txnsReceivedGroup.push(groupedArray);
                }
              }
              console.log("Txns received group: ", txnsReceivedGroup);
              setTxns(txnsReceivedGroup);
              setTimeout(() => {
                setPage(2);
              }, 1000);
            } else {
              setMoreTxns(false);
            }
          }
          setLoading(false);
        })
        .catch((err) => {
          setErrOcc(true);
          console.warn(err);
          setLoading(false);
        });
    }
  }, [cluster]);

  const getPrevNext = (value) => {
    setLoading(true);
    const xToken = localStorage.getItem("reac_wid") ?? "";

    axios({
      url: `${process.env.REACT_APP_BACKEND_EP}/getTransactions/${cluster}/${value}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${xToken}`,
      },
    })
      .then((res) => {
        if (res.data.txns.length > 0) {
          const txnReceived = res.data.txns;
          const txnsReceivedGroup = [];
          if (txnReceived.length === 0) setMoreTxns(false);
          else {
            for (let index = 0; index < txnReceived.length - 1; index++) {
              const currentTxn = txnReceived[index];
              var groupedArray = [currentTxn];
              var checkUpto = index;
              for (let txn = index + 1; txn < txnReceived.length; txn++) {
                const nextTxn = txnReceived[txn];
                if (
                  nextTxn.tag_address &&
                  nextTxn.tag_address === currentTxn.tag_address
                ) {
                  groupedArray.push(nextTxn);
                  checkUpto = txn;
                } else break;
              }
              index = checkUpto;
              txnsReceivedGroup.push(groupedArray);
            }
            setPage(value + 1);
          }
          setTxns([...txns, ...txnsReceivedGroup]);
        } else {
          setMoreTxns(false);
        }
        setLoaded(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        setErrOcc(true);
        console.warn(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (firstTxn !== "") {
    }
  }, [recall]);

  useEffect(() => {
    const handleActivityFalse = () => {
      setChatFocus(false);
      console.log("Stopping Live Feed Refresh");
      if (refreshCounter) {
        setPauseTimer(true);
      }
    };

    const handleActivityTrue = () => {
      setChatFocus(true);
      console.log("Starting Live Feed Refresh");
      if (refreshCounter) {
        setPauseTimer(false);
      }
    };

    window.addEventListener("focus", handleActivityTrue);
    window.addEventListener("blur", handleActivityFalse);

    return () => {
      window.removeEventListener("focus", handleActivityTrue);
      window.removeEventListener("blur", handleActivityFalse);
    };
  }, [chatFocus]);

  const copyValue = (value) => {
    navigator.clipboard.writeText(value);
    setCopied("Copied");
    setTimeout(() => {
      setCopied("Copy");
    }, 500);
  };

  return (
    <div>
      <div className={styles.txn_section}>
        <h3 className={styles.main_heading}></h3>
        {refreshCounter ? (
          timer === 0 ? (
            <div className={styles.refresh_section}>
              <img
                src={rotateRefresh}
                className={styles.loading_image}
                alt="loading"
              />{" "}
              Refreshing
            </div>
          ) : (
            <div className={styles.refresh_section}>
              <img
                src={staticRefresh}
                className={styles.loading_image}
                alt="loading"
              />{" "}
              Refreshing in{" "}
              <img
                src={duration}
                className={styles.duration_image}
                alt="duration"
              />{" "}
              {timer} secs
            </div>
          )
        ) : (
          <div></div>
        )}

        <div className={styles.all_txn_container}>
          {txns.length > 0
            ? txns.map((each_txn) => (
                <>
                  <div className={styles.feed_txn_outer}>
                    <div className={styles.feed_txn_signer}>
                      <a
                        href={`/address/${
                          each_txn[0].tag_address || each_txn[0].signers[0]
                        }`}
                        className={styles.link_labels_2}
                      >
                        <div className={styles.avatar_area}>
                          <img src={avatar2} alt="display pic" />
                          <span className={styles.text}>
                            {shortenAddress(
                              each_txn[0].tag_address || each_txn[0].signers[0]
                            )}
                          </span>
                        </div>
                      </a>
                      <div className={styles.copy_btn_container}>
                        <Tooltip
                          content={copy}
                          className="myMarginTarget"
                          direction="up"
                          useHover={true}
                          background="#101010"
                          color="#fefefe"
                          arrowSize={0}
                          styles={{ display: "inline" }}
                        >
                          <motion.button
                            onClick={() =>
                              copyValue(
                                each_txn[0].tag_address ||
                                  each_txn[0].signers[0]
                              )
                            }
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <img src={copyIcon} alt="copy value" />
                          </motion.button>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  <div style={{ paddingLeft: "10px", paddingBottom: "20px" }}>
                    <div className={styles.border_area_feed}>
                      <GroupTransactions
                        txns={each_txn}
                        address={address}
                        cluster={cluster}
                      />
                    </div>
                  </div>
                </>
              ))
            : ""}
          {errOcc && (
            <div className={`text-center ${styles.could_not_text}`}>
              Could Not Load Transactions
            </div>
          )}
          <div ref={ref} className="ten-height-2">
            <div className="text-danger"></div>
          </div>
          <div className="pt-2 text-center ten-height">
            {isLoading && <TxnLoader />}
            {!isLoading && txns.length === 0 && (
              <div className={styles.could_not_text}>
                You do not have any transactions, search and follow some wallets
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedTransactions;
