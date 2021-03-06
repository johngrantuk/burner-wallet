import React from 'react';
import { Scaler } from "dapparatus";
import Ruler from "./Ruler";
import {CopyToClipboard} from "react-copy-to-clipboard";

export default ({balance, privateKey, burnWallet, changeAlert, changeView}) => {
  return (
    <div className="main-card card w-100">
      <div className="content bridge row">
        <div className="col-6 p-1">
        <a className="btn btn-large w-100" href="https://dai-bridge.poa.network/" target="_blank" rel="noopener noreferrer">
          <Scaler config={{startZoomAt:500,origin:"50% 50%",adjustedZoom:1}}>
            <i className="fas fa-credit-card"></i> DAI {"<-->"}xDai
          </Scaler>
        </a>
        </div>
        <div className="col-6 p-1">
        <button className="btn btn-large w-100" onClick={()=>{
          changeView('request_funds')}
        }>
          <Scaler config={{startZoomAt:500,origin:"25% 50%",adjustedZoom:1}}>
            <i className="fa fa-money-bill-wave" aria-hidden="true"></i> Request Funds
          </Scaler>
        </button>
        </div>
      </div>
      {privateKey &&
      <div>
        <Ruler/>
        <div className="content ops row">
          <CopyToClipboard text={privateKey}>
            <div className="col-6 p-1"
                 onClick={() => changeAlert({type: 'success', message: 'Private Key copied to clipboard'})}>
              <button className="btn btn-large w-100">
                <Scaler config={{startZoomAt:500,origin:"25% 50%",adjustedZoom:1}}>
                  <i className="fas fa-save"/> Save Wallet
                </Scaler>
              </button>
            </div>
          </CopyToClipboard>
          <div className="col-6 p-1">
            <button className="btn btn-large w-100"
                    onClick={()=>{
                      console.log("BALANCE",balance)
                      if(parseFloat(balance)<=.1){
                        burnWallet()
                      }else{
                        changeAlert({type: 'danger', message: 'Can\'t burn more than $0.10'})
                      }
                    }}>
              <Scaler config={{startZoomAt:500,origin:"25% 50%",adjustedZoom:1}}>
                <i className="fas fa-fire"/> Burn Wallet
              </Scaler>
            </button>
          </div>
        </div>
      </div>
      }
    </div>
  )
}
