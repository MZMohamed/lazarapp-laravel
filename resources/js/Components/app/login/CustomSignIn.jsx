import { Amplify } from "aws-amplify";

import { Authenticator, useTheme, Heading, Text, View, Image } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import LazarLogo from "../../assets/images/LAZAR_PRIMARY_WHITE&BLK.png"

import awsExports from "../../aws-exports";
Amplify.configure(awsExports);

const formFields = {
  confirmVerifyUser: {
    confirmation_code: {
      label: "New Label",
      placeholder: "Enter your Confirmation Code:",
      isRequired: false,
    },
  },
};

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="Lazar logo"
          src={LazarLogo}
        />
      </View>
    );
  },
  VerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },

  ConfirmVerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
};

export default function CustomSignIn({children}) {
  return (
    <Authenticator
      formFields={formFields}
      components={components}
      hideSignUp={true}
    >
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
          {/* {children} */}
        </main>
      )}
    </Authenticator>
  );
}
