export function update(holder) {
    return (key, value) => {
        const before = holder.state[key];
        const after = Object.assign({}, before, value);

        const newPartialState = {};
        newPartialState[key] = after;

        holder.setState(newPartialState);
    }
}