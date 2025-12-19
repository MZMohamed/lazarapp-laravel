import React from 'react'


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
