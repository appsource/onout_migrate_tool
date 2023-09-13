import type { NextPage } from "next"
import styles from "/styles/Home.module.css"

import { useEffect, useState } from "react"
import useWeb3 from "/helpers/useWeb3"

import { getStorageInfo } from "/storage"

import STORAGE_JSON from "/contracts/Storage.json"
import SwitchNetworkAndCall from "/components/SwitchNetworkAndCall"
import callContractMethod from "/helpers/callContractMethod"

import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite'
import 'react-json-view-lite/dist/index.css'

import url from 'url'
import isEvmAddress from "/helpers/isEvmAddress"

import {
  AVAILABLE_NETWORKS_INFO,
  CHAIN_INFO,
  CHAIN_EXPLORER_LINK,
  ZERO_ADDRESS
} from "/helpers/constants"

const settingsTabs = {
  //domain: `Migrate domain`,
  owner: `Migrate ownership`,
}

const debugLog = (msg) => { console.log(msg) }

const CHAINS_LIST = (() => {
  const ret = Object.keys(AVAILABLE_NETWORKS_INFO).map((k) => {
    return {
      id: AVAILABLE_NETWORKS_INFO[k].networkVersion,
      title: AVAILABLE_NETWORKS_INFO[k].chainName,
    }
  })
  ret.unshift({
    id: 0,
    title: `Select Blockchain`,
  })
  return ret
})()

const Settings: NextPage = (props) => {
  const {
    storageChainId,
    storageAddress
  } = getStorageInfo()

  const {
    openConfirmWindow,
    addNotify,
  } = props

  const {
    isWalletConnecting,
    isConnected,
    isSwitchChain,
    address: connectedAddress,
    activeChainId,
    activeWeb3,
    connectWeb3,
    switchChainId
  } = useWeb3(storageChainId)

  const [ storageContract, setStorageContract ] = useState(false)
  
  const showAlert = (message, title) => {
    openConfirmWindow({
      title,
      message,
      isOk: true,
      onConfirm: () => {}
    })
  }
  useEffect(() => {    
    if ( activeWeb3 && storageChainId && storageAddress ) {
      const _storageContract = new activeWeb3.eth.Contract(STORAGE_JSON.abi, storageAddress)
      setStorageContract(_storageContract)
    }
  }, [ activeWeb3, storageChainId, storageAddress ])

  const getActiveChain = () => {
    return {
      activeChainId,
      activeWeb3,
    }
  }

  const [activeTab, setActiveTab] = useState(`owner`)

  /* ------------------------------------------- */
  const renderActiveChainInfo = () => {
    const chainInfo = CHAIN_INFO(activeChainId)
    const storageChainInfo = CHAIN_INFO(storageChainId)

    return (
      <div className={styles.adminActiveChainInfo}>
        <span>
          Current active network is <b>{chainInfo?.chainName || `Unknown`} ({activeChainId})</b>
        </span>
        <span>
          Main config storage network is <b>{storageChainInfo?.chainName || `Unknown`} ({storageChainId})</b>
        </span>
      </div>
    )
  }
  const formatDomain = (_url) => {
    const parsed = url.parse(_url)
    return parsed.hostname || parsed.pathname
  }
  /* -------------------------------------------- */
  // OWNERSHIP Migrate
  const [ ownerDomain, setOwnerDomain ] = useState('')
  const [ ownerCurrent, setOwnerCurrent ] = useState('')
  const [ ownerNew, setOwnerNew ] = useState('')
  const [ ownerIsFetching, setOwnerIsFetching ] = useState(false)
  const [ ownerIsFetched, setOwnerIsFetched ] = useState(false)
  const [ ownerJsonData, setOwnerJsonData ] = useState(false)
  
  const fetchOwnerJsonData = () => {
    setOwnerIsFetched(false)
    setOwnerIsFetching(true)
    const _domain = formatDomain(ownerDomain)
    storageContract.methods.getData(_domain).call()
      .then((answer) => {
        console.log('>>> JSON', answer)
        setOwnerCurrent(answer.owner)
        try {
          const json = JSON.parse(answer.info)
          console.log('>>> JSON', json)
          setOwnerJsonData(json)
        } catch (e) {
          setOwnerJsonData({})
        }
        setOwnerIsFetched(true)
        setOwnerIsFetching(false)
      })
      .catch((err) => {
        setOwnerIsFetching(false)
        addNotify(`Fail fetch domain info. ${err.message}`, `error`)
      })
  }
  
  const [ isMigrate, setIsMigrate ] = useState(false)
  
  const doMigrate = () => {
    if (!isEvmAddress(ownerNew)) return showAlert(`Specifiy correct address of new ownership`, `Error`)
    openConfirmWindow({
      title: `Migrate ownership`,
      message: (
        <>
          <div>
            {`Do you realy want migrate owner for domain`}<br />
            <strong>{formatDomain(ownerDomain)}</strong><br />
            {` from `}<br />
            <strong>{ownerCurrent}</strong><br />
            {` to `}<br />
            <strong>{ownerNew}</strong><br />
            {`???`}
          </div>
          <div>
          </div>
        </>
      ),
      onConfirm: () => {
        setIsMigrate(true)
        callContractMethod({
          activeWeb3,
          contract: storageContract,
          method: 'setKeyData',
          args: [
            formatDomain(ownerDomain),
            {
              owner: ownerNew,
              info: JSON.stringify(ownerJsonData)
            }
          ],
          onTrx: (hash) => {
            addNotify(`txId ${hash}`, `success`)
          },
          onSuccess: () => {
            addNotify(`Ownership migrated`, `success`)
            setIsMigrate(false)
            fetchOwnerJsonData()
          },
          onError: (err) => {
            addNotify(`Fail migrate ownership ${err.message}`, `error`)
            setIsMigrate(false)
          }
        })
      }
    })
  }

  const ownerCancel = () => {
    setOwnerDomain('')
    setOwnerCurrent('')
    setOwnerIsFetched('')
    setOwnerJsonData('')
  }
 
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Onout migrate tools</h1>
      {!connectedAddress || `${activeChainId}` != `${storageChainId}` ? (
        <>
          {`${activeChainId}` != `${storageChainId}` && activeChainId ? (
            <button disabled={isSwitchChain} className={`${styles.mainButton} primaryButton`} onClick={() => { switchChainId() }}>
              {isSwitchChain ? `Switching network` : `Switch network`}
            </button>
          ) : (
            <button disabled={isWalletConnecting} className={`${styles.mainButton} primaryButton`} onClick={connectWeb3}>
              {isWalletConnecting ? `Connecting` : `Connect Wallet`}
            </button>
          )}
        </>
      ) : (
        <>
          {renderActiveChainInfo()}
          <div className={styles.adminForm}>
            <div className={styles.adminInfo}>
              <span>{`Connected wallet`}</span>
              <span>
                <strong>{connectedAddress}</strong>
              </span>
            </div>
          </div>
          <ul className={styles.settingsTabsNav}>
            {Object.keys(settingsTabs).map((tabKey) => {
              return (
                <li onClick={() => { setActiveTab(tabKey) }} key={tabKey} className={(tabKey === activeTab) ? styles.activeTab : ``}>
                  {settingsTabs[tabKey]}
                </li>
              )
            })}
          </ul>
          <hr className={`${styles.divider} ${styles.spacerTop}`} />
          {activeTab == 'domain' && (
            <>Domain</>
          )}
          {activeTab == 'owner' && (
            <>
              <div className={styles.adminForm}>
                <div className={styles.subFormInfo}>
                  <h3>Migrate ownership of domain</h3>
                  {!ownerIsFetched && (
                    <>
                      <div className={styles.infoRow}>
                        <label>Domain:</label>
                        <div>
                          <input type="text" value={ownerDomain} onChange={(e) => { setOwnerDomain(e.target.value) }} />
                        </div>
                      </div>
                      <div className={styles.actionsRow}>
                        <button disabled={ownerIsFetching} onClick={fetchOwnerJsonData} className={styles.adminButton}>
                          {(ownerIsFetching) ? `Fetching domain info...` : `Fetch domain info`}
                        </button>
                      </div>
                    </>
                  )}
                  {ownerIsFetched && (
                    <>
                      {ownerCurrent == ZERO_ADDRESS ? (
                        <>
                          <hr />
                          <div className={styles.adminInfo}>
                            <span><strong>{formatDomain(ownerDomain)}</strong></span>
                          </div>
                          <div className={styles.adminInfoError}>
                            <span>This domain is not configured. Migration not available.</span>
                          </div>
                          <hr />
                          <div className={styles.actionsRow}>
                            <button className={styles.adminButton} onClick={ownerCancel}>
                              Try other domain
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          {ownerCurrent !== connectedAddress ? (
                            <>
                              <hr />
                              <div className={styles.adminInfo}>
                                <span><strong>{formatDomain(ownerDomain)}</strong></span>
                              </div>
                              <div className={styles.adminInfoError}>
                                <span>You are not the owner of {formatDomain(ownerDomain)}</span>
                                <span>This domain ownership is: {ownerCurrent}</span>
                              </div>
                              <hr />
                              <div className={styles.actionsRow}>
                                <button className={styles.adminButton} onClick={ownerCancel}>
                                  Try other domain
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <hr />
                              <div className={styles.adminInfo}>
                                <span><strong>{formatDomain(ownerDomain)}</strong></span>
                              </div>
                              <div className={styles.adminInfoError}>
                                <span>Migrate owner ship for {formatDomain(ownerDomain)}</span>
                                <span>Be carefull</span>
                                <span>if you specify a wallet that you do not have access to, you will lose access to the domain</span>
                                <span>Migration is available ONLY for the domain owner</span>
                                <span>If you lose access to your wallet, we will not be able to help you!</span>
                              </div>
                              <hr />
                              <div className={styles.infoRow}>
                                <label>New ownership:</label>
                                <div>
                                  <input type="text" value={ownerNew} onChange={(e) => { setOwnerNew(e.target.value) }} />
                                </div>
                              </div>
                              <div className={styles.actionsRow}>
                                <button className={styles.adminButton} onClick={doMigrate} disabled={isMigrate}>
                                  {`Migrate ownership`}
                                </button>
                                <button className={styles.adminButton} onClick={ownerCancel} disabled={isMigrate}>
                                  {`Cancel`}
                                </button>
                              </div>
                              <div className={styles.adminInfoWarning}>
                                <span>Current domain settings</span>
                              </div>
                              <hr />
                              <div>
                                <JsonView data={ownerJsonData} shouldExpandNode={allExpanded} style={darkStyles} />
                              </div>
                              <hr />
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Settings;
