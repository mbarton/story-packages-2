function content(n) {
    return { id: n };
}

function searchResults(n) {
    const ret = [];

    for(let i = 0; i < n; i++) {
        ret.push(content(i));
    }

    return ret;
}

export const TEST_DATA = {
    contentSearch: {
        results: searchResults(12)
    },
    package: {
        content: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ]
    }
}