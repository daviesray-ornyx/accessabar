import funcConfig from '../config/functions.config.json5';

/**
 * Util functions for Accessabar.
 *
 * @class AccessabarUtil
 */
class AccessabarUtil {
    /**
     * Moves the page content to accomodate for Accessabar.
     *
     * Note: Possibly should be moved to separate folder.
     *
     * @static
     * @memberof AccessabarUtil
     */
    public static moveBody() {
        const { mainElement } = window.abar;

        if (mainElement) {
            const rect = mainElement.getBoundingClientRect();
            document.body.style.marginTop = `${rect.height}px`;
        }
    }

    /**
     * Checks the page is ready before moving page content.
     *
     * @static
     * @returns
     * @memberof AccessabarUtil
     */
    public static createSpace() {
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            this.moveBody();

            return;
        }

        document.addEventListener('DOMContentLoaded', this.moveBody);
    }

    public static handleConflicts(config: { conflicts: string[] }) {
        if (!config.conflicts || config.conflicts.length === 0) {
            return;
        }

        const { conflicts } = config;

        for (const v of conflicts) {
            if (window.abar.appliedFunctions.has(v)) {
                const func = window.abar.appliedFunctions.get(v);

                if (func) {
                    func();
                }
            }
        }
    }

    public static applyFunction(name: string, callback: () => unknown) {
        if (Object.keys(funcConfig).indexOf(name) === -1) {
            return;
        }

        const config: Accessabar.IConfigObject = funcConfig[name];

        if (!window.abar.appliedFunctions.has(name)) {
            this.handleConflicts(config);
            window.abar.appliedFunctions.set(name, callback);
            return;
        }

        const func = window.abar.appliedFunctions.get(name);

        if (config.disableOnClick && func) {
            func();
            window.abar.appliedFunctions.delete(name);
        }
    }

    public static pruneFuncs(el: HTMLElement, abarEdited: string, fontSizing: Accessabar.IConfigObject) {
        const funcNames = abarEdited.split(' ') || [];

        if (funcNames.indexOf(fontSizing.editName) !== -1 && funcNames.length > 1) {
            const index = funcNames.indexOf(fontSizing.editName);
            funcNames.splice(index, 1);
            el.setAttribute('accessabar-edited', funcNames.join(' '));
        } else {
            el.removeAttribute('accessabar-edited');
        }
    }
}

export default AccessabarUtil;
export { AccessabarUtil };
