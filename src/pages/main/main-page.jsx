import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import Columns from '../../components/columns/columns';
import mainStyles from './main-page.module.css'
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import Modal from '../../components/modal/modal';
import OrderDetails from '../../components/order-details/order-details';

const MainPage = ({closeModal}) => {
  const orderData = useSelector(store => store.order.order)

  return (
    <main className={mainStyles.main}>
      <DndProvider backend={HTML5Backend}>
        <Columns>
          <BurgerIngredients />
          <BurgerConstructor />
        </Columns>
      </DndProvider>
      {orderData &&
        <Modal closeModal={closeModal}>
          <OrderDetails orderNumber={orderData.number} />
        </Modal>
      }
    </main>
  )
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
}

export default MainPage;