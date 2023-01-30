import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { useSelector } from 'react-redux';
import {
  FilterSliceState,
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizza, selectGetPizza } from '../redux/slices/pizzaSlice';

import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { sortNames } from '../components/Sort';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectGetPizza);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const onClickCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizza = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const oreder = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizza({
        sortBy,
        oreder,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );

    window.scrollTo(0, 0);
  };

//   React.useEffect(() => {
//     if (isMounted.current) {
//         const queryString = qs.stringify({
//             sortProperty: sort.sortProperty,
//             categoryId,
//             currentPage,
//         })
//         navigate(`?${queryString}`)
//     }
//     isMounted.current = true
// }, [categoryId, sort.sortProperty, searchValue, currentPage])

// // Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
// React.useEffect(() => {
//     return () => {
//         if (window.location.search) {
//             const params = qs.parse(window.location.search.substring(1))
//             const sort = sortNames.find(obj => obj.sortProperty === params.sortBy)
//             dispatch(setFilters({
//                 ...params, sort
//             }as FilterSliceState))
//         }
//         isSearch.current = true
//     }
// }, [])

// // Если был первый рендер, то запрашиваем пиццы
// React.useEffect(() => {
//     window.scrollTo(0, 0)
//     if (!isSearch.current) {
//       getPizza()
//     }
//     isSearch.current = false
// }, [categoryId, sort.sortProperty, searchValue, currentPage])

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const paramSort = sortNames.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort: paramSort,
        } as FilterSliceState),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);



    if (!isSearch.current) {
      getPizza();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);


  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Всі піци</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Сталась помилка 😕</h2>
          <p> На жаль, не вдалося отримати піци.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
