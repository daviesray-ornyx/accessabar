import { h, VNode } from 'hyperapp';

interface ICustomList {
    currentItem: string;
    listItems: VNode[];
    active: boolean;
    openList(event: MouseEvent): never;
}

const customList = ({ listItems, active, openList, currentItem }: ICustomList) => {
    return h('ab-custom-list', { class: 'ab-custom-list ab-flex ab-flex-column' }, [
        h(
            'ab-custom-list-box',
            {
                class: `ab-custom-list-box ab-flex ${active ? 'ab-active' : ''}`,
                id: 'ab-custom-list-box',
                onclick: (event) => {
                    openList(event);
                },
            },
            currentItem,
        ),
        h(
            'ab-custom-list-selection',
            {
                'aria-labelledby': 'ab-custom-list-box',
                class: `ab-custom-list-selection ${active ? 'ab-flex' : 'ab-hide'} ab-flex-column`,
                id: 'ab-font-list-selection',
                role: 'listbox',
            },
            listItems,
        ),
    ]);
};

export default customList;
export {
    customList,
};
