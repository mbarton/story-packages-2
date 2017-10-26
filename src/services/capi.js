const ROOT = "https://internal.content.guardianapis.com";

function getTone(item) {
    const tag = item.tags.find(({ type }) => type === "tone");

    if(tag) {
        return tag.webTitle;
    }

    return item.sectionName;
}

export function getLatestItems(text) {
    const params = [
        "page-size=20", "order-by=newest", "show-fields=internalShortId"
    ];

    if(text) {
        params.push(`q=${encodeURIComponent(text)}`);
    }

    // TODO MRB: should really be composer id instead?
    return fetch(`${ROOT}/search?${params.join("&")}`)
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
    return fetch(`${ROOT}${shortId}?show-fields=internalShortId,thumbnail,lastModified,trailText&show-tags=all&show-packages=true`)
        .then(r => r.json())
        .then(({ response }) => {
            const { content } = response;
            const packageData = content.packages ? content.packages : [];

            return {
                id: content.fields.internalShortId,
                headline: content.webTitle,
                trailText: content.fields.trailText,
                tone: getTone(content),
                thumbnail: content.fields.thumbnail,
                webPublicationDate: content.webPublicationDate,
                packages: packageData.map(({ packageId, packageName }) => {
                    return { id: packageId, title: packageName };
                })
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