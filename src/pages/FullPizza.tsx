import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>({
    imageUrl: 'string',
    title: '',
    price: 0
  });

  React.useEffect(() => {
    async function fecthPizza() {
      try {
        const { data } = await axios.get('https://62c81ac48c90491c2caeb75d.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {

        alert('Такої піци немає')
        navigate('/')
      }
    }
    fecthPizza();
  },[]);


  if(!pizza){
    return <>'Loading...'</>
  }

  return (
    <div>
      <img src={pizza.imageUrl}/>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
