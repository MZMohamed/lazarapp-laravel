import Header from "@/Components/app/Header";
import PropTypes from "prop-types";
import FlashMessages from '@/Components/Messages/FlashMessages';
// customize mui theme
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
    palette: {
        primary: { main: "#333132" },
        secondary: {
            main: "#40ae49",
        },
    },
});

export default function MaterialUiLayout({ children }) {


    return (
        <ThemeProvider theme={theme}>
            <Header />
            <FlashMessages />
            <main>{children}</main>
        </ThemeProvider>
    );
}

MaterialUiLayout.propTypes = {
    children: PropTypes.node,
};
