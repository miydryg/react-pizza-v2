import React from 'react';

const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = ['Всі', 'Мясні', 'Вегетаріанські', 'Гриль', 'Гострі', 'Закриті'];

  return (
    <div>
      <div className="categories">
        <ul>
          {categories.map((value, i) => (
            <li
              key={i}
              onClick={() => setActiveIndex(i)}
              className={activeIndex === i ? 'active' : ''}>
              {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
