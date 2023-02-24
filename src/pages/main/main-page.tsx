import React, { FC } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useAppSelector } from '../../utils/hooks/app-hooks';

import Columns from '../../components/columns/columns';
import mainStyles from './main-page.module.css'
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import Modal from '../../components/modal/modal';
import OrderDetails from '../../components/order-details/order-details';
import { IMain } from '../../utils/types';

const MainPage: FC<IMain> = ({closeModal}) => {
  const orderData = useAppSelector(store => store.order.order)

  return (
    <main className={mainStyles.main}>
      <DndProvider backend={HTML5Backend}>
        <Columns>
          <BurgerIngredients />
          <BurgerConstructor />
        </Columns>
      </DndProvider>
      {orderData?.name &&
        <Modal closeModal={closeModal}>
          <OrderDetails orderNumber={orderData.number} />
        </Modal>
      }
    </main>
  )
}


export default MainPage;