import PropTypes from 'prop-types';

export const Header = ({usuario}) => {
    return(
        <>
        <div id="header">
            <p id="user">{usuario}</p>
        </div>
        </>
    );
}

Header.propTypes = {
    usuario: PropTypes.string.isRequired
}