import dom from 'common/Dom';
import contents from './contents';

const generateModalMarkup = data => {
  const { name, data: modalData } = data;
  return contents[name](modalData);
};

export const showModal = data => {
  const modalBody = generateModalMarkup(data);
  $(dom.modalContents).html(modalBody);
};
