import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger'
import BulidControls from '../../components/Burger/BuildControls/BuildControls'
import Aux from '../../hoc/Aux'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
  }
  updatePurchase = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0)
    this.setState({ purchasable: sum > 0 })
  }

  addIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredient = {
      ...this.state.ingredients
    }
    updatedIngredient[type] = updatedCount;
    const addedPrice = INGREDIENT_PRICE[type];
    this.setState({
      totalPrice: this.state.totalPrice + addedPrice,
      ingredients: updatedIngredient
    })
    this.updatePurchase(updatedIngredient)
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] > 0) {
      const updatedCount = this.state.ingredients[type] - 1;
      const updatedIngredient = {
        ...this.state.ingredients
      }
      updatedIngredient[type] = updatedCount;
      const addedPrice = INGREDIENT_PRICE[type];
      this.setState({
        totalPrice: this.state.totalPrice - addedPrice,
        ingredients: updatedIngredient
      })
      this.updatePurchase(updatedIngredient)
    }
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <Aux>
        <Modal>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BulidControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemove={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable} />
      </Aux>
    )
  }
}

export default BurgerBuilder;