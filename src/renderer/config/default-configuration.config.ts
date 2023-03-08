export const defaultConfiguration: {[key in DefaultConfigKey]: any} = {
    "first-color": "#3b82ff",
    "second-color": "#ff4444",
    "theme": "os",
    "language": window.navigator.language.length <= 2 ? `${window.navigator.language}-${window.navigator.language.toLocaleUpperCase()}` : window.navigator.language,
    "supported_languages": ["en-US", "en-EN", "fr-FR", "es-ES"],
    "default_mods": ["SongCore", "WhyIsThereNoLeaderboard", "BeatSaverDownloader", "BeatSaverVoting", "PlaylistManager"],
    "default-shared-folders": [
        "Beat Saber_Data\\CustomLevels",
        "Beat Saber_Data\\CustomWIPLevels",
        "DLC"
    ]
}

export type DefaultConfigKey = "first-color" | "second-color" | "theme" | "language" | "supported_languages" | "default_mods" | "default-shared-folders";

export type ThemeConfig = "dark" | "light" | "os"
