import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import styles from './VotingPoll.module.css';

const VotingPollABI = require('config/abi/VotingPoll.json');
const VotingFactoryABI = require('config/abi/VotingFactory.json');
var locked = false;

export const VotingPoll = () => {
  let { voteId } = useParams();
  let { active, account, library } = useWeb3React();
  const [address, setAddress] = useState("");
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [owner, setOwner] = useState("");
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [votes, setVotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address && voteId && library && !localStorage.getItem("hash")) {
      const contract = new ethers.Contract(address, VotingPollABI, library.getSigner());
      contract.getState().then((res: any) => {
        setTitle(res[0]);
        setOwner(res[2])
        setOptions(res[1]);
        let _votes = [];
        for (let i = 0; i < res[3].length; i++) {
          if (res[3][i]) {
            _votes.push(res[3][i].toNumber())
          }
        }
        setVotes(_votes);
      });
      contract.alreadyVoted(account).then((res: boolean) => {
        setAlreadyVoted(res);
      })
    }
  }, [address, voteId, library, localStorage])

  useEffect(() => {
    if (library && voteId) {
      const contract = new ethers.Contract(
        process.env.REACT_APP_VOTING_FACTORY || "", VotingFactoryABI, library.getSigner());
      try {
        contract.getVotingPollById(Number(voteId)).then((res: string) => setAddress(res))
      } catch (e) {
        console.log(e);
        setAddress("");
      }
    }
  }, [voteId, library])

  const handleClick = (idx: number) => {
    if (address && voteId && library) {
      const contract = new ethers.Contract(address, VotingPollABI, library.getSigner());
      contract.vote(idx).then((res: any) => {
        localStorage.setItem("hash", res.hash);
        setLoading(true);
        console.log(res);
      })
    }
  }
  
  useEffect(() => {
    const timer = setInterval(() => {
      getTransaction();
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTransaction = async () => {
    const txHash = localStorage.getItem("hash") || "";
    console.log("!", txHash, locked);
    if (locked) return;
    if (txHash) {
      locked = true;
      try {
        const provider = new ethers.providers.StaticJsonRpcProvider("https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
        const res = await provider.getTransactionReceipt(txHash);
        console.log(res);
        if (res && res.confirmations > 1) {
          localStorage.removeItem("hash");
          setLoading(false);
          locked = false;
          window.location.reload();
          console.log("successfully done ....")
        }
        locked = false;
      } catch (e) {
        console.log(e);
        locked = false;
      }
    }
  }

  return (
    <div className={styles.content}>
      {loading && <div className={styles.screenSaver}>
        <div className={styles.spinnerContainer}>
          <div className={styles.loadingSpinner}>
          </div>
        </div>
      </div>}
      {active && title && options.length > 0 && owner && <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>title</td>
            <td>{title}</td>
          </tr>
          <tr>
            <td>owner</td>
            <td>{owner}</td>
          </tr>
          <tr>
            <td>options</td>
            <td>
              <div className={styles.options}>
                {options.map((item, idx) => 
                  <button 
                    className={styles.button} 
                    key={idx}
                    onClick={() => handleClick(idx)}
                    disabled={alreadyVoted}
                  >
                    {item}({votes[idx]})
                  </button>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>}
    </div>
  )
}