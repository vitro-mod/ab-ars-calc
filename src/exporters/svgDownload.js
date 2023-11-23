function download(filename = 'graph.svg') {

    const a = document.createElement('a') // Create "a" element
    let svgEl = document.querySelector('svg');
    svgEl.style.overflow = 'auto';
    let svg = svgEl.outerHTML.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    const blob = new Blob([svg], { type: "image/svg+xml" })
    // Create a blob (file-like object)
    const url = URL.createObjectURL(blob) // Create an object URL from blob
    a.setAttribute('href', url) // Set "a" element link
    a.setAttribute('download', filename) // Set download filename
    a.click() // Start downloading
}