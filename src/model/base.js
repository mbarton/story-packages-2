export function set(app) {
    return (key, value) => {
        const newState = Object.assign({}, app.state);
        newState[key] = value;

        app.setState(newState);
    }
}

export function update(app) {
    const setOnApp = set(app);

    return (key, value) => {
        const before = app.state[key];
        const after = Object.assign({}, before, value);

        setOnApp(key, after);
    }
}

export function modify(app) {
    const setOnApp = set(app);

    return (key, fn) => {
        const before = app.state[key];
        const after = Object.assign({}, before, fn(before));

        setOnApp(key, after);
    }
}