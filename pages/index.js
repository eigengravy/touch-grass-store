import React, { useState, useEffect } from "react";
import CreateProduct from "../components/CreateProduct";
import HeadComponent from '../components/Head';
import Product from "../components/Product";

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const App = () => {

  const { publicKey } = useWallet();
  const isOwner = (publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false);
  const [creating, setCreating] = useState(false);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (publicKey) {
      fetch(`/api/fetchProducts`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          console.log("Products", data);
        });
    }
  }, [publicKey]);

  const renderNotConnectedContainer = () => (
    <div>
      <img src="https://media.istockphoto.com/photos/hand-touching-grass-picture-id486187560?k=20&m=486187560&s=170667a&w=0&h=0IFVEvr8OtHhi4RUMZQgiFaVSsYbDhMUWWgQFDiFATI=" alt="touching grass" />
      <div className="button-container">
        <WalletMultiButton className="cta-button connect-wallet-button" />
      </div>
    </div>
  );

  const renderItemBuyContainer = () => (
    <div className="products-container">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );


  return (
    <div className="App">
      <HeadComponent />
      <div className="container">
        <header className="header-container">
          <p className="header"> Touch Grass Store </p>
          <p className="sub-text">The only grass store that accepts sh*tcoins</p>
          {isOwner && (
            <button className="create-product-button" onClick={() => setCreating(!creating)}>
              {creating ? "Close" : "Create Product"}
            </button>
          )}
        </header>

        <main>
          {creating && <CreateProduct />}
          {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}
        </main>

        <div className="footer-container">
          <a className="footer-text"
            href="https://github.com/eigengravy"
            target="_blank"
            rel="noreferrer">
            {`built with ❤️`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
