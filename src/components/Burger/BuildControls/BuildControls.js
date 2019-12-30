import React from 'react';
import BulidControl from '../BuildControl/BuildControl'

import classes from './BulidControls.css'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const bulidControls = (props) => (
  <div className={classes.BulidControls}>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
      <BulidControl key={ctrl.label} label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        remove={() => props.ingredientRemove(ctrl.type)}
        disabled={props.disabled[ctrl.type]} />
    )
    )}
    <button className={classes.OrderButton} disabled={!props.purchasable}>Order Now</button>
  </div>
)

export default bulidControls