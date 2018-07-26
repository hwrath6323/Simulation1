import React from 'react';
import shelfieIcon from '/Users/hwrathall6323/Documents/DevMountain/Projects/simulation-1/shelfie/src/shelfie_icon.png';

const Header = () => {
    return(
            <div className="Header">
                <div className="logo-container">
                    {/* <div className="logo">
                        <img src={shelfieIcon} />
                    </div> */}
                    <div className="site-name">
                        SHELFIE
                    </div>
                </div>
                <div className="site-header-buttons">
                    <button>Dashboard</button>
                    <button>Add to Inventory</button>
                </div>
            </div>
    )
};

export default Header;