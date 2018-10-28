import {
    div,
    h1,
} from '@hyperapp/html';

const logo = () => {
    return div({ id: 'logo' }, [
        h1('Accessabar'),
    ]);
};

export default logo;
export { logo };
