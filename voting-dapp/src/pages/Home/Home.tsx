import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';

import styles from './Home.module.css';

const VotingFactoryABI = require('config/abi/VotingFactory.json');

export const Home: React.FC = () => {
  let { library } = useWeb3React();
  const [titles, setTitles] = useState([]);
  useEffect(() => {
    console.log(library);
    if (library) {
      const contract = new ethers.Contract(
        process.env.REACT_APP_VOTING_FACTORY || "", VotingFactoryABI, library.getSigner());
      try {
        contract.getVotingPollTitles().then((res: []) => setTitles(res))
      } catch (e) {
        console.log(e);
        setTitles([]);
      }
    }
  }, [library])
  
  return (
    <>
      <div className={styles.content}>
        <h1 className={styles.header}>Voting Poll List</h1>
        {titles && titles.map((item, idx) => (
          <div className={styles.record} key={idx}>
            <div className={styles.idx}>{idx}</div>
            <Link to={`/${idx}`} className={styles.list}>
              {item}
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}