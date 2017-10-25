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

export const TEST_PACKAGES = [
    { id: 1, title: "Empty Package", content: [null, null, null, null, null, null, null, null, null, null] },
    { id: 2, title: "Package 1", content: [content(0), null, content(1), null, null, null, null, null, null, null] },
    { id: 3, title: "Package 2", content: [null, null, content(2), null, null, null, null, null, null, null] },
    { id: 4, title: "Package 3", content: [content(3), content(4), content(5), null, null, null, null, null, null, null] }
]

export const TEST_DATA = {
    contentSearch: {
        loading: true,
        results: []
    },
    editor: {
        loading: false,
        thePackage: null
    },
    packageSearch: {
        text: null,
        loading: false,
        results: []
    }
}