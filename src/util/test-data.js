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
            content(1),
            content(2),
            content(3),
            content(4),
            content(5),
            null,
            null,
            null,
            null,
            content(6),
            content(7),
            content(8)
        ]
    }
}