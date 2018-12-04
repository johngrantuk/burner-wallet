import React, { Component } from "react";
import QrReader from "react-qr-reader";

export default class ScannerTest extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      delay: 500,
      isScanning: true,
      errorMessage: '',
      isError: false,
      result: 'Please Scan A QR'
    };

    this.handleError = this.handleError.bind(this);
    this.openImageDialog = this.openImageDialog.bind(this);
  }

  stopRecording = () => this.setState({ delay: false });

  handleScan = data => {

    if (data) {

      if(!this.state.isError){
        console.log('Stopping')
        this.stopRecording();
        this.setState({
          errorMessage: 'Hopefully It Worked Ok? If not please update Issue - Thanks',
          isScanning: false
        });
      }

      console.log('QR Data: ' + data)
      this.setState({ result: 'QR Data: ' + data });
    }
  };

  handleError(err){
    this.setState({
      result: 'Please upload a QR Code',
      errorMessage: err.toString(),
      isError: true
    });

  };

  openImageDialog() {
      this.refs.qrReader1.openImageDialog()
  }

  render() {

    let display = '';
    let errorMessage = this.state.errorMessage;

    if(this.state.isError){
      display = (
        <div>
        <h1>Scanner Test</h1>
        <div>
          <p>{this.state.result}</p>
          <input type="button" value="Submit QR Code" onClick={this.openImageDialog} />
          <p>Reason You Couldn't Scan: { errorMessage }</p>
          <QrReader
            ref="qrReader1"
            delay={this.state.delay}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "60%", height: "60%" }}
            legacyMode={true}
          />
        </div>
        </div>
      )
    }else{

      let scanner = '';

      if(this.state.isScanning === true){
          scanner = <QrReader
            delay={this.state.delay}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "60%", height: "60%" }}
          />
      }

      display = (
        <div>
        <h1>Scanner Test</h1>
        <div>
          <p>{this.state.result}</p>
          <p>{ errorMessage }</p>
          { scanner }
        </div>
        </div>
      )
    }

    return (
      <div style={{ padding: 30 }}>
      { display }
      </div>
    );
  }
}
