import Header from "@/Components/app/Header";
import PropTypes from "prop-types";

// customize mui theme
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
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
            <main>{children}</main>
        </ThemeProvider>
    );
}

MaterialUiLayout.propTypes = {
    children: PropTypes.node,
};
