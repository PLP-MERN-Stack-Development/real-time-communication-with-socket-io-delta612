exports.formatTimestamp = (iso) => {
try {
const d = new Date(iso);
return d.toLocaleTimeString();
} catch (err) {
return iso;
}
};