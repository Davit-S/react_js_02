export default function handleKeyDown (key, pushFunc) {
    if (key === "Enter") {
        pushFunc();
    };
};