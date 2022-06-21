import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { injected } from 'utils/connectors';
import { Button } from 'components';
import styles from './Header.module.css';
import React, { useEffect, useState } from 'react';

export const Header: React.FC = () => {
  const { chainId, account, active, activate, deactivate } = useWeb3React();

  const handleConnect = () => {
    if (active) {
      deactivate();
      localStorage.clear();
      return;
    }
    activate(injected, (error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    console.log(localStorage.getItem("connected"));
    if (localStorage.getItem("connected") === "YES") {
      if (!active) {
        activate(injected, (error) => {
          console.log(error);
        });
      }
    }
  }, [])

  useEffect(() => {
    if (active) {
      localStorage.setItem("connected", "YES");
    }
  }, [active])

  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.menuItem} >
          <p className={styles.logoName}>Voting DApp</p>
        </Link >
      </div>
      <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>

      <div className={styles.menu}>
        <Button buttonSize='sm' onClick={handleConnect}>
          {active ? 'Disconnect' : 'Connect'}
        </Button>
      </div>
    </div>
  )
}