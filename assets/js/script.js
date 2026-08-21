// Preventing Copying your code from Inspect Element and View Source Code

document.oncontextmenu = () => {
    return false
}

document.onkeydown = e => {
    if(e.key === "F12" || e.ctrlKey && e.key === "u".toLowerCase()){
        return false;
    }

    if(e.ctrlKey && e.key === 'c'.toLowerCase() || e.ctrlKey && e.key === 'v'.toLowerCase()){
        return false;
    }
}