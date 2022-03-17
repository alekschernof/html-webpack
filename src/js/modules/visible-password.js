export default {
    init() {
        $(document).on('click', '.js-visible-password', (e) => {
            const item = e.currentTarget;
            const inputPassword = item.parentElement.querySelector('.js-input-password');

            if (inputPassword.type === 'password') {
                inputPassword.type = 'text';
                $(item).addClass('active');
            } else {
                inputPassword.type = 'password';
                $(item).removeClass('active');
            }
        });
    },
};
