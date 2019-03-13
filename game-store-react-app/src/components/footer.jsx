import React, { Fragment } from 'react';

const Footer = (props) => (
        <div>
            <footer id="footer" className="page-footer mt-4">
                © Book Library {new Date().getFullYear()}
            </footer>
        </div>
);

export default Footer;