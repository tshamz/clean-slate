import { bindUIActions as AddToCartBindings } from 'bindings/AddToCartBindings';
import { bindUIActions as OptionGroupBindings } from 'bindings/OptionGroupBindings';
import { bindUIActions as QuantityControlBindings } from 'bindings/QuantitySelectBindings';

export const bindUIActions = () => {
  AddToCartBindings();
  OptionGroupBindings();
  QuantityControlBindings();
};
