const ROOT = "https://internal.content.guardianapis.com";

function getTone(item) {
    const tag = item.tags.find(({ type }) => type === "tone");

    if(tag) {
        return tag.webTitle;
    }

    return "";
}

export function getLatestItems() {
    // TODO MRB: should really be composer id instead?
    return fetch(`${ROOT}/search?page-size=20&order-by=newest&show-fields=internalShortId`)
        .then(r => r.json())
        .then(({ response }) => {
            const { results } = response;
            
            return results.map(result => {
                return {
                    id: result.fields.internalShortId
                }
            });
        });
}

export function getItem(shortId) {
    return fetch(`${ROOT}${shortId}?show-fields=internalShortId,thumbnail,lastModified&show-tags=all`)
        .then(r => r.json())
        .then(({ response }) => {
            const { content } = response;

            return {
                id: content.fields.internalShortId,
                title: content.webTitle,
                tone: getTone(content),
                thumbnail: content.fields.thumbnail,
                webPublicationDate: content.webPublicationDate,
                lastModified: content.fields.lastModified
            }
        });
}

export function getPackages(search) {
    return fetch(`${ROOT}/packages?q=${encodeURIComponent(search)}`)
        .then(r => r.json())
        .then(({ response }) => {
            const { results } = response;

            return results.map(({ packageId, packageName, lastModified }) => {
                return {
                    id: packageId,
                    name: packageName,
                    lastModified
                }
            });
        });
}