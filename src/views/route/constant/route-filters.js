export const routeFilterPlaceholders = Object.freeze({
    AddRequestHeader: {
        placeholder: {
            param: "Authorization",
            value: "Bearer abccc..."
        },
    },
    AddRequestParameter: {
        placeholder: {
            param: "example1",
            value: "active",
        }
    },
    AddResponseHeader: {
        placeholder: {
            param: "X-Privacy-Policy",
            value: "https://example.com/privacy",
        }
    },
    // TODO: if you need more filters, add more.
});

export const routeFilterOptions = Object.freeze([
    {id: "AddRequestHeader", label: "Request Header"},
    {id: "AddRequestParameter", label: "Request Parameter"},
    {id: "AddResponseHeader", label: "Response Header"},
]);
