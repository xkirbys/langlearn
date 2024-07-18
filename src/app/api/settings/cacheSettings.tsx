const cacheSettings = {
    cacheTime: 60 * 1000, // 1 minute in milliseconds
    CacheExpired: (timestamp: number) => Date.now() - timestamp > cacheSettings.cacheTime,
};

export default cacheSettings;