/* pages/__app.js */
import '../styles/globals.css'
import { useState } from 'react'
import Link from 'next/link'
import { css } from '@emotion/css'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { AccountContext } from '../context.js'
import { ownerAddress } from '../config'
import 'easymde/dist/easymde.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faLinkedin, faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'
import config from "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;


function MyApp({ Component, pageProps }) {
  /* create local state to save account information after signin */
  const [account, setAccount] = useState(null)
  /* web3Modal configuration for enabling wallet access */
  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: { 
            infuraId: "your-infura-id"
          },
        },
      },
    })
    return web3Modal
  }

  /* the connect function uses web3 modal to connect to the user's wallet */
  async function connect() {
    try {
      const web3Modal = await getWeb3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const accounts = await provider.listAccounts()
      setAccount(accounts[0])
    } catch (err) {
      console.log('error:', err)
    }
  }

  return (
    <div>
    <div>
      <nav className={nav}>
        <div className={header}>
          <Link href="/">
            <a>
              <Image
                src='/logo.svg'
                alt="React Logo"
                width= {55} 
                height= {55}
              />
            </a>
          </Link>
          <Link href="/">
            <a>
              <div className={titleContainer}>
                <h2 className={title}>Agustin Brazzola</h2>
                <p className={description}>Full stack web 3 developer</p>
              </div>
            </a>
          </Link>
          {
            !account && (
              <div className={buttonContainer}>
                <button className={buttonStyle} onClick={connect}>Connect</button>
              </div>
            )
          }
          {
            account && <p className={accountInfo}>Connected to: {account}</p>
          }
        </div>
        <div className={linkContainer}>
          <Link href="/" >
            <a className={link}>
              Home
            </a>
          </Link>
          {
            /* if the signed in user is the contract owner, we */
            /* show the nav link to create a new post */
            (account === ownerAddress) && (
              <Link href="/create-post">
                <a className={link}>
                  Create Post
                </a>
              </Link>
            )
          }
           <Link href="https://twitter.com/pdog355">
           <a className={linkContainer}>
             <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
           </a>
           </Link>
           <Link href="https://www.linkedin.com/in/agustinbrazzola/">
           <a className={linkContainer}>
             <FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon>
           </a>
           </Link>
           <Link href="https://github.com/agustinbrazzola">
           <a className={linkContainer}>
             <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
           </a>
           </Link>
               <div className={homeDescription}> 
        This is my personal website. Here you will find anything useful about my professional profile. This is built on top of Mumbai Network and posts are stored on the blockchain.
        I highly encourage to take a deep look into my work. You&apos;ll see my tech stack, my job experience and some blockchain stuff I&apos;d like to share with you. Having in mind that blockchain positions are very complex, it makes sense to follow this format. 
        Hope you enjoy it and feel free to connect on any of my socials.
      </div>
        </div>
      </nav>
      <div className={container}>
        <AccountContext.Provider value={account}>
          <Component {...pageProps} connect={connect} />
        </AccountContext.Provider>
      </div>
    </div>
    </div>
  )
}
const accountInfo = css`
  width: 100%;
  color: green;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  font-size: 12px;
`

const container = css`
  padding: 40px;
`

const linkContainer = css`
  padding: 30px 60px;
  background-color: #fafafa;
`

const nav = css`
  background-color: white;
`

const header = css`
  display: flex;
  padding: 20px 30px;
`

const description = css`
margin: 0;
color: #999999;
`
const homeDescription = css`
font-weight: 400;
font-size: 22px;
margin: 30px;
color: #999999;
`

const titleContainer = css`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
`

const title = css`
  margin-left: 30px;
  font-weight: 500;
  margin: 0;
`

const buttonContainer = css`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: flex-end;
`

const buttonStyle = css`
  background-color: #fafafa;
  outline: none;
  border: none;
  font-size: 18px;
  padding: 16px 70px;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 7px 7px rgba(0, 0, 0, .1);
`

const link = css`
  margin: 0px 40px 0px 0px;
  font-size: 16px;
  font-weight: 400;
`

export default MyApp