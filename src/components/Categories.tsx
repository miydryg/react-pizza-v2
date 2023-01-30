import React from 'react';

type CategoriesProps = {
  categoryId: number;
  onClickCategory: (i: number) => void;
}

const Categories: React.FC<CategoriesProps> = React.memo(({ categoryId, onClickCategory }) => {
  const categories = ['Всі', 'Мясні', 'Вегетаріанські', 'Гриль', 'Гострі', 'Закриті'];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={categoryId === i ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
})

export default Categories;
