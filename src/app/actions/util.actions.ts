import funcConfig from '../../config/functions.config.json5';

function moveBody() {
  const {mainElement} = window.ace;

  if (mainElement) {
    const rect = mainElement.getBoundingClientRect();
    document.body.style.marginTop = `${rect.height}px`;
  }
}

interface AceResize {
  aceHidden: boolean;
}

function aceResize({aceHidden}: AceResize) {
  const {mainElement} = window.ace;

  if (!mainElement) {
    return;
  }

  if (aceHidden) {
    const rect = mainElement.getBoundingClientRect();

    mainElement.style.top = `-${rect.height - 2}px`;

    return;
  }

  moveBody();
}

function handleConflicts(config: {conflicts: string[]}) {
  if (!config.conflicts || config.conflicts.length === 0) {
    return;
  }

  const {conflicts} = config;

  for (const v of conflicts) {
    if (window.ace.appliedFunctions.has(v)) {
      const func = window.ace.appliedFunctions.get(v);

      if (func) {
        func();
      }
    }
  }
}

function startFunction(
  name: string,
  stopCallback: () => unknown,
  startCallback: () => unknown
) {
  if (Object.keys(funcConfig).indexOf(name) === -1) {
    return;
  }

  const config: Ace.ConfigObject = funcConfig[name];

  handleConflicts(config);

  if (!window.ace.appliedFunctions.has(name)) {
    window.ace.appliedFunctions.set(name, stopCallback);
    startCallback();
    return;
  }

  const func = window.ace.appliedFunctions.get(name);

  if (config.disableOnClick && func) {
    func();
    window.ace.appliedFunctions.delete(name);
  } else {
    startCallback();
  }
}

function stopFunction(name: string) {
  if (!window.ace.appliedFunctions.has(name)) {
    return;
  }

  const func = window.ace.appliedFunctions.get(name);

  if (func) {
    func();
    window.ace.appliedFunctions.delete(name);
  }
}

function pruneFuncs(
  el: HTMLElement,
  abarEdited: string,
  config: Ace.ConfigObject
) {
  const funcNames = abarEdited.split(' ') || [];

  if (funcNames.indexOf(config.editName) !== -1 && funcNames.length > 1) {
    const index = funcNames.indexOf(config.editName);
    funcNames.splice(index, 1);
    el.setAttribute('ace-edited', funcNames.join(' '));
  } else {
    el.removeAttribute('ace-edited');
  }
}

export {
  aceResize,
  moveBody,
  handleConflicts,
  pruneFuncs,
  startFunction,
  stopFunction,
};
