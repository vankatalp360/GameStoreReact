import React, { Fragment } from 'react';

const Footer = (props) => (
    <footer id="footer" className="page-footer mt-4">
        © Game Store {new Date().getFullYear()}
    </footer>
);

export default Footer;