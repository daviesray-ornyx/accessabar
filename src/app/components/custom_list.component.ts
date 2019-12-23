import { h, VNode } from 'hyperapp';

interface ICustomList {
    currentItem: string;
    listItems: VNode[];
    active: boolean;
    openList(): never;
}

const customList = ({ listItems, active, openList, currentItem }: ICustomList) => {
    return h('ab-custom-list', { class: 'ab-custom-list ab-flex ab-flex-column' }, [
        h(
            'ab-custom-list-box',
            {
                class: `ab-custom-list-box ab-flex ${active ? 'ab-active' : ''}`,
                id: 'ab-custom-list-box',
                onclick: () => {
                    openList();
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

const customListItemFactory = (listItems: Accessabar.IListItem[]): VNode[] => {
    const list: VNode[] = [];

    for (const obj of listItems) {
        const item = h(
            'ab-custom-list-selection-item',
            {
                class: 'ab-custom-list-selection-item',
                onclick: () => {
                    obj.action(obj.key);
                },
                role: 'option',
            },
            obj.name,
        );

        list.push(item);
    }

    return list;
};

export default customList;
export {
    customList,
    customListItemFactory,
};
