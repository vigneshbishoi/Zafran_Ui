module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module-resolver",
                {
                    alias: {
                        app: "./app",
                        "@actions": "./app/actions",
                        "@api": "./app/api",
                        "@assets": "./app/assets",
                        "@components": "./app/components",
                        "@config": "./app/config",
                        "@models": "./app/models",
                        "@navigation": "./app/navigation",
                        "@reducers": "./app/reducers",
                        "@sagas": "./app/sagas",
                        "@screens": "./app/screens",
                        "@selectors": "./app/selectors",
                        "@services": "./app/services",
                        "@store": "./app/store",
                        "@utils": "./app/utils",
                        "@data": "./app/data",
                        "@selectors": "./app/selectors",
                        "@navigation": "./app/navigation",
                    },
                },
            ],
        ],
    };
};
