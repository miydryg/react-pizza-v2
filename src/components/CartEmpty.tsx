import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>Корзина пуста 😕</h2>
      <p>
        Найімовірніше за все, ви ще не замовляли  піцу.
        <br />
        Щоб замовити піцу, перейди на головну сторінку.
      </p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Повернутись назад</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
