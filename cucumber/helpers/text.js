function normalize(text) {
    return text.trim().replace(/(\s+)|(&nbsp;)/g, ' ');
}
module.exports = {
    normalize
};