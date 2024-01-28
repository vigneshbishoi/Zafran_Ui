import Loading from "@screens/Loading";
import PreviewImage from "@screens/PreviewImage";
import SelectDarkOption from "@screens/SelectDarkOption";
import SelectFontOption from "@screens/SelectFontOption";

export default {
    // Loading: {
    //     component: Loading,
    //     options: {
    //         title: "Loading",
    //         gestureEnabled: false,
    //     },
    // },
    PreviewImage: {
        component: PreviewImage,
        options: {
            title: "gallery_image",
        },
    },
    SelectDarkOption: {
        component: SelectDarkOption,
        options: {
            title: "dark_and_light_mode",
        },
    },
    SelectFontOption: {
        component: SelectFontOption,
        options: {
            title: "font",
        },
    },
};
