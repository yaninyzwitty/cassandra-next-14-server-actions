export const weatherCodeToString: {
    [key: number]: {
        icon: string;
        label: string;
    };
} = {
    0: {
        icon: "c01d",
        label: "clear sky"
    },
    1: {
        icon: "c02d",
        label: "Mainly sky"

    },
    2: {
        icon: "c03d",
        label: "Partly cloudy"

    },
    3: {
        icon: "c04d",
        label: "Overcast"

    },
    45: {
        icon: "s05d",
        label: "Fog"

    },
    48: {
        icon: "s05d",
        label: "Deposit rime fog"

    },
    51: {
        icon: "d01d",
        label: "Drizzle"

    },
    53: {
        icon: "d01d",
        label: "Drizzle"

    },
    75: {
        icon: "s0zd",
        label: "Snow"

    },
    77: {
        icon: "s0zd",
        label: "Snow grains"

    },

    80: {
        icon: "r02d",
        label: "Rain Showers"

    },
    82: {
        icon: "r02d",
        label: "Rain Showers"

    },
    85: {
        icon: "s01d",
        label: "Snow showers"

    },
    86: {
        icon: "s01d",
        label: "Snow showers"

    },
    95: {
        icon: "t04d",
        label: "Thunderstorm"

    },
    96: {
        icon: "t04d",
        label: "Thunderstorm"

    },



};

export default weatherCodeToString;