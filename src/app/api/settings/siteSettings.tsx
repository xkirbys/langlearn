const siteSettings = {
    requestURL: "http://localhost:8765",
    demoMode: false,
};

function setDemoMode(demoMode: boolean) {
    siteSettings.demoMode = demoMode;
    siteSettings.requestURL = demoMode ? 'http://localhost:8765' : 'https://langlearn.com';
}

export {
    siteSettings,
    setDemoMode,
};