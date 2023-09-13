import type { AppProps } from "next/app"
import Head from 'next/head'
import "../styles/globals.css"
import styles from "../styles/Home.module.css"
import useStorage from "../storage/"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { getUnixTimestamp } from "../helpers/getUnixTimestamp"

import NotifyHolder from "../components/NotifyHolder"
import { useRef } from "react"

let confirmWindowOnConfirm = () => {}
let confirmWindowOnCancel = () => {}
const defaultConfirmWindowLabels = {
  title: `Message`,
  message: `Confirm`,
  ok: `Ok`,
  cancel: `Cancel`,
} 

function MyApp({ Component, pageProps }: AppProps) {
  const {
    storageData,
    storageIsLoading,
  } = useStorage()

  const router = useRouter()
  const urlExt = (process.env.NODE_ENV && process.env.NODE_ENV !== 'production') ? `` : `.html`


  const routerBaseName = router.asPath.split('/').reverse()[0].split('?')[0];

  const iframeHideMenu = router.asPath.indexOf('isSettingsFrame=true') !== -1

  const isSettingsPage = (routerBaseName === `settings${urlExt}`)
  const isMarketPage = (routerBaseName === `marketplace${urlExt}`)
  const isMintPage = (routerBaseName === `mint${urlExt}`)
  const isMintOwnPage = (routerBaseName === `mintown${urlExt}`)
  const isHomePage = (routerBaseName === `index${urlExt}`) || (routerBaseName === ``)


  /* Confirm window */
  const [ isConfirmWindowOpened, setIsConfirmWindowOpened ] = useState(false)
  const [ confirmWindowLabels, setConfirmWindowLabels ] = useState(defaultConfirmWindowLabels)
  const [ isConfirmWindowOk, setIsConfirmWindowOk ] = useState(false)


  const onConfirmWindowConfirm = () => {
    setIsConfirmWindowOpened(false)
    confirmWindowOnConfirm()
  }
  const onConfirmWindowCancel = () => {
    setIsConfirmWindowOpened(false)
    confirmWindowOnCancel()
  }
  const openConfirmWindow = (options = {}) => {
    const {
      onConfirm,
      onCancel,
    } = options

    console.log(options)
    confirmWindowOnConfirm = (onConfirm) ? onConfirm : () => {}
    confirmWindowOnCancel = (onCancel) ? onCancel : () => {}
    setIsConfirmWindowOk(options.isOk)
    setConfirmWindowLabels({
      title: options.title || defaultConfirmWindowLabels.title,
      message: options.message || defaultConfirmWindowLabels.message,
      ok: options.okLabel || defaultConfirmWindowLabels.ok,
      cancel: options.cancelLabel || defaultConfirmWindowLabels.cancel,
    })
    setIsConfirmWindowOpened(true)
  
  }
  /* -------------- */
  const notifyHolder = new NotifyHolder({})
  const addNotify = (msg, style = `info`) => {
    notifyHolder.addItem({
      msg,
      style,
      time: getUnixTimestamp(),
      utx: getUnixTimestamp(),
    })
  }

  
  return (
    <div>
      <Head>
        <title>{`Onout migrate tool`}</title>
        <style global>
          {`
            .svg-inline--fa {
              display: var(inline-block);
              height: 1em;
              overflow: visible;
              vertical-align: -0.125em;
            }
            svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
              overflow: visible;
              box-sizing: content-box;
            }

            .someOwnClass {
              background: red;
            }
          `}
        </style>
      </Head>
      
      <Component
        {...pageProps }
        storageData={storageData}
        storageIsLoading={storageIsLoading}
        openConfirmWindow={openConfirmWindow}
        addNotify={addNotify}
      />
      {notifyHolder.render()}
      {/* ---- Confirm block ---- */}
      { isConfirmWindowOpened && (
        <div className={styles.confirmWindow}>
          <div>
            <h3>{confirmWindowLabels.title}</h3>
            <span>{confirmWindowLabels.message}</span>
            <div>
              <button className={`${styles.mainButton} primaryButton`} onClick={onConfirmWindowConfirm}>
                {confirmWindowLabels.ok}
              </button>
              {!isConfirmWindowOk && (
                <button className={`${styles.mainButton} primaryButton`} onClick={onConfirmWindowCancel}>
                  {confirmWindowLabels.cancel}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyApp;
