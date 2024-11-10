import React, { Component } from 'react'
// MUI
import { Button, TextField } from '@material-ui/core';

//assets
import mainImage from "../../assets/images/LAZAR_PRIMARY_WHITE&BLK.png"

//AWS
import { ForgotPassword } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';


export default class CustomForgotPassword extends ForgotPassword {

    constructor(props) {
        super(props);
        // this.state = {
        //   username: "",
        //   password: "",
        //   isButtonDisabled: true,
        //   helperText: "",
        //   error: false
        // };
    
        this._validAuthStates = ["forgotPassword"];
        this.handleKeyPress = this.handleKeyPress.bind(this);
      }

    handleKeyPress = e => {
        if (e.keyCode === 13 || e.which === 13) {
            super.signIn();
        }
    };

    showComponent() {
        return (
            <div>
                Test
            </div>
        )
    }
}
