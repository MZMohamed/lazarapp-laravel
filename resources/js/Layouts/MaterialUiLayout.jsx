
import PropTypes from 'prop-types';

export default function MaterialUiLayout({ children }) {

    return (
        <main>{children}</main>
    );
}

MaterialUiLayout.propTypes  = {
    children: PropTypes.node
}
