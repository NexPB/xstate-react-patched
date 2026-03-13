# xstate-react-patched

This package contains utilities for using [XState](https://github.com/statelyai/xstate/releases/tag/%40xstate%2Freact%403.2.2) with [React](https://github.com/facebook/react/).

> Note: This repository is a patched fork of the upstream `@xstate/react` package from hash [5dd9e25](https://github.com/statelyai/xstate/commit/5dd9e258c93dfd5a9e2898ea97c9d8137552d1c2), maintained specifically to preserve support for the removed `@xstate/fsm` dependency.

- [Read the full documentation in the XState docs](https://xstate.js.org/docs/packages/xstate-react/).

## Quick start

1. Install `xstate` and `@xstate/react`:

```bash
npm i xstate@4.37.2 xstate-react-patched@3.2.2-patch.0
```

2. Import the `useMachine` hook:

```js
import { useMachine } from '@xstate/react';
import { createMachine } from 'xstate';

const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: { TOGGLE: 'active' }
    },
    active: {
      on: { TOGGLE: 'inactive' }
    }
  }
});

export const Toggler = () => {
  const [state, send] = useMachine(toggleMachine);

  return (
    <button onClick={() => send('TOGGLE')}>
      {state.value === 'inactive'
        ? 'Click to activate'
        : 'Active! Click to deactivate'}
    </button>
  );
};
```
