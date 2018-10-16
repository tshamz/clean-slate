import dom from 'core/Dom';
import bva from 'core/Constants';

import { updateState } from 'core/Helpers';

import { getProductContainer } from 'containers/ProductContainers';
import { getVariantContainer } from 'containers/VariantContainers';
import { optionGroupContainers } from 'containers/OptionGroupContainers';
import { getSelectedOptions, getAllOptionGroupValues } from 'containers/OptionGroupContainers';


export const handleOptionChange = (container, data) => {
  console.log(container);
  console.log(data);
};

export const updateInStockOptionValues = node => {
  const selectedOptions = getSelectedOptions(node);
  const optionGroupValues = getAllOptionGroupValues(node);

  const disabledOptionValues = optionGroupValues.filter(([node, { name, value, variants }]) => {
    const possibleOptions = { ...selectedOptions, [name]: value };
    const inStockVariants = variants.filter(variant => varaint.available);





    variants.some(variant => {

      variant.options

    })
    console.log(possibleOptions);




    // const isSelected = selectedOptions[name] === value;


    // console.log(isSelected);
    // return !isSelected

  })

  // console.log(optionGroupValues);

  // const optionValueContainers =
  // const filteredOptions = getVariantContainer(node).get('options').filter(options =>
  //   Object.entries(options).some(([name, value]) => selectedOptions[name] === value));


  // console.log(filteredOptions);

};

export const updateOptionGroupContainer = (node, data) => {
  return Promise.resolve(
    optionGroupContainers
      .set(node, updateState(node, bva.optionGroup, data))
      .get(node)
  );
};
