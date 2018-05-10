
import platform from '../native-base-theme/variables/platform.js';

export default Object.assign({}, platform, {
    toolbarDefaultBg: '#3B5998',
    toolbarInputColor: platform === "ios" ? "#FFFFFF" : "#fff",
})