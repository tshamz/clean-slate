import { bindUIActions as AddToCartBindings } from 'bindings/CartEventBindings';
import { bindUIActions as OptionGroupBindings } from 'bindings/OptionGroupBindings';
import { bindUIActions as QuantityControlBindings } from 'bindings/QuantitySelectBindings';

export const bindUIActions = () => {
  AddToCartBindings();
  OptionGroupBindings();
  QuantityControlBindings();
};
