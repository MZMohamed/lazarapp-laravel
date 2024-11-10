import React, { Component } from 'react'

//AWS
import { RequireNewPassword } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';


export default class CustomRequireNewPassword extends RequireNewPassword {

    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: "",
          isButtonDisabled: true,
          helperText: "",
          error: false
        };
    
        this._validAuthStates = ["requireNewPassword"];
        // this.handleKeyPress = this.handleKeyPress.bind(this);
      }

    showComponent(theme) {
        return (
            <div>
                Test
            </div>
        )
    }
}
