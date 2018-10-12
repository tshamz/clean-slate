import { bindUIActions as AddToCartBindings } from 'bindings/CartEventBindings';
import { bindUIActions as OptionGroupBindings } from 'bindings/OptionSelectBindings';
import { bindUIActions as QuantityControlBindings } from 'bindings/QuantitySelectBindings';

export const bindUIActions = () => {
  AddToCartBindings();
  OptionGroupBindings();
  QuantityControlBindings();
};
