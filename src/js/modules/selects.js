// eslint-disable-next-line no-unused-vars
import 'select2';

export default {
  init() {
    $('#type_message').select2({
      placeholder: 'Selectув',
      minimumResultsForSearch: -1,
    });

    $('#city').select2({
      minimumResultsForSearch: -1,
    });
  },
};
