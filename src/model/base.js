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
        console.log(`${key}: ${JSON.stringify(value)}`);

        const before = app.state[key];
        const after = Object.assign({}, before, value);

        setOnApp(key, after);
    }
}